using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dto = Server.Model.Dto;  // 取別名 Dto
using Entities = Server.Model.Entities;  // 取別名 Dto
using BCrypt.Net;
using Server.Model.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Server.Services;

namespace Server.Controllers
{
    /// <summary>
    /// 會員相關 API
    /// </summary>
    [ApiController]               // ✅ 標記 Controller
    [Route("api/[controller]/[action]")]   // ✅ 設定路由
    public class UserController(AppDbContext dbcontext, IConfiguration config, IJwtService jwtService) : ControllerBase
    {
        private readonly AppDbContext _dbcontext = dbcontext;
        private readonly IConfiguration _config = config;
        private readonly IJwtService _jwtService = jwtService;

        /// <summary>
        /// 測試用問候 API
        /// </summary>
        /// <returns>回傳 Hello World 訊息</returns>
        [HttpGet()]     // ✅ 對應 GET /api/User/greet
        public IActionResult Greet() => Ok(new { message = "Hello World" });

        #region API 說明
        [HttpPost()]
        [EndpointSummary("使用者註冊")]
        [EndpointDescription(@"
        * 參數涵蓋(data)
        1. Name:使用者姓名
        2. Email:信箱
        3. Password:使用者姓名
        4. ConfirmPassword:確認密碼
        回傳 status 'success:成功' 'error:失敗'
        ")]
        // [EndpointGroupName("user")]
        #endregion
        public IActionResult Register([FromBody] Dto.User.RegisterDto data)
        {
            // Console.WriteLine($"收到註冊請求: {data}");
            if (!ModelState.IsValid)
            {
                return Ok(new Dto.ApiResponse<object>
                {
                    Status = "fail",
                    Message = "資料格式錯誤",
                    Data = ModelState
                });
            }
            // 1️⃣ 基本資料驗證
            if (string.IsNullOrWhiteSpace(data.UserName) ||
                string.IsNullOrWhiteSpace(data.Email) ||
                string.IsNullOrWhiteSpace(data.Password) ||
                string.IsNullOrWhiteSpace(data.ConfirmPassword))
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "請填寫所有必填欄位", Data = null });
            }
            // 2️⃣ 密碼與確認密碼比對
            if (data.Password != data.ConfirmPassword)
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "密碼與確認密碼不相同", Data = null });
            }
            // 3️⃣ 檢查是否已有相同 Email
            bool emailExists = _dbcontext.User.Any(u => u.Email == data.Email);
            if (emailExists)
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "此 Email 已被註冊", Data = null });
            }
            // 4️⃣ 密碼 Hash
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);

            // 5️⃣ 模擬存資料庫
            var newUser = new Entities.UserDB
            {
                Username = data.UserName,
                Password = hashedPassword,
                Phone = data.Phone,
                Email = data.Email,
                Birthday = data.Birthday,
                Gender = data.Gender,
                Role = "member",
                Pw = data.Password,
            };
            // _users.Add(newUser);
            // var names = _users.Select(u => u.Name).ToList();
            AddUser(newUser);
            // 6️⃣ 回傳結果
            return Ok(new Dto.ApiResponse<object>
            {
                Status = "success",
                Message = "註冊成功",
                Data = newUser
            });
        }

        #region API 說明
        [HttpPost()]
        [EndpointSummary("使用者登入")]
        [EndpointDescription(@"
        * 參數涵蓋(data)
        1. Address:信箱
        2. Password:密碼
        回傳 status 'success:成功' 'error:失敗'")]
        // [EndpointGroupName("user")]
        #endregion
        public IActionResult Login([FromBody] Dto.User.LoginDto data)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new Dto.ApiResponse<object>
                {
                    Status = "fail",
                    Message = "資料格式錯誤",
                    Data = ModelState
                });
            }
            // 1️⃣ 基本資料驗證
            if (string.IsNullOrWhiteSpace(data.Address) ||
                string.IsNullOrWhiteSpace(data.Password))
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "請填寫所有必填欄位", Data = null });
            }
            // 2️⃣ 檢查是否有此 Email
            var user = _dbcontext.User.FirstOrDefault(u => u.Email == data.Address);
            if (user == null)
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "無此使用者", Data = null });
            }
            // 3️⃣ 密碼比對
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(data.Password, user.Password);
            if (!passwordMatch)
            {
                return Ok(new Dto.ApiResponse<object> { Status = "fail", Message = "密碼錯誤", Data = null });
            }
            // 🧾 JWT 產生
            var token = _jwtService.GenerateToken(user.Id.ToString());

            // 把 JWT 寫入 HttpOnly Cookie
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,       // ✅ 防止前端 JS 取用
                Secure = true,         // ✅ HTTPS 才會傳送（開發階段可暫時關掉）
                SameSite = SameSiteMode.None, // ✅ 允許跨域（如果前端是 localhost:3000）
                Expires = DateTimeOffset.UtcNow.AddHours(1) // ✅ Token 有效期
            });

            // 4️⃣ 設定 Session
            // HttpContext.Session.SetString("UserId", user.Id.ToString());

            // 5️⃣ 回傳結果
            return Ok(new Dto.ApiResponse<object>
            {
                Status = "success",
                Message = "登入成功",
                Data = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Role,
                    token
                }
            });
        }

        #region API 說明
        [HttpPost()]
        [EndpointSummary("使用者登出")]
        [EndpointDescription("登出並刪除 JWT Cookie")]
        // [EndpointGroupName("user")]
        #endregion
        public IActionResult Logout()
        {
            // 刪除 JWT Cookie
            Response.Cookies.Delete("jwt");

            return Ok(new Dto.ApiResponse<object>
            {
                Status = "success",
                Message = "登出成功",
                Data = null
            });
        }
        private string GenerateJwtToken(string userid)
        {
            var jwt = _config.GetSection("Jwt");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, userid),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private void AddUser(Entities.UserDB user)
        {
            try
            {
                _dbcontext.User.Add(user);
                _dbcontext.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // 資料庫更新失敗
                Console.WriteLine($"資料庫錯誤: {ex.Message}");
                throw; // 可選擇再拋出，讓上層處理
            }
            catch (Exception ex)
            {
                // 其他錯誤
                Console.WriteLine($"發生錯誤: {ex.Message}");
                throw;
            }
        }

        [HttpGet()]
        [EndpointSummary("取得目前使用者資料")]
        [EndpointDescription("需要攜帶 Cookie")]
        // [EndpointGroupName("user")]
        public IActionResult GetProfile()
        {
            // 1. 從 Cookie 讀取 JWT
            if (!Request.Cookies.TryGetValue("jwt", out var token))
            {
                return Unauthorized(new Dto.ApiResponse<object>
                { Status = "fail", Message = "未攜帶 JWT Cookie", Data = null });
            }
            var jwtSection = _config.GetSection("Jwt");
            var jwtKey = jwtSection["Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                return StatusCode(500, new
                {
                    status = "fail",
                    message = "系統未設定 JWT Key",
                    data = (object?)null
                });
            }
            // 2️⃣ 驗證 Token
            var claims = _jwtService.ValidateToken(token, out var error);
            if (claims == null)
            {
                return Unauthorized(new { Status = "fail", Message = error });
            }

            // 3️⃣ 取得使用者資料
            var userId = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized(new { Status = "fail", Message = "Token 中無使用者 ID" });
            }
            var user = _dbcontext.User.FirstOrDefault(u => u.Id.ToString() == userId);
            if (user != null)
            {
                Console.WriteLine(user.Pw);
                return Ok(new { Status = "success", Data = new { user.Username, user.Role } });

            }
            return Ok(new { Status = "success", Data = new { userId } });
        }
    }
}