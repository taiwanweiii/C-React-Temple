using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dto = Server.Model.Dto;  // 取別名 Dto
using Entities = Server.Model.Entities;  // 取別名 Entities
using BCrypt.Net; // 先用 NuGet 安裝 BCrypt.Net-Next

namespace Server.Controllers
{
    /// <summary>
    /// 會員相關 API
    /// </summary>
    [ApiController]               // ✅ 標記 Controller
    [Route("api/[controller]/[action]")]   // ✅ 設定路由
    public class UserController : ControllerBase
    {
        private static List<Entities.UserDB> _users = new List<Entities.UserDB>();


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
            // 1️⃣ 基本資料驗證
            if (string.IsNullOrWhiteSpace(data.Name) ||
                string.IsNullOrWhiteSpace(data.Email) ||
                string.IsNullOrWhiteSpace(data.Password) ||
                string.IsNullOrWhiteSpace(data.ConfirmPassword))
            {
                return BadRequest(new { message = "請填寫完整資料" });
            }
            // 2️⃣ 密碼與確認密碼比對
            if (data.Password != data.ConfirmPassword)
            {
                return BadRequest(new { message = "密碼與確認密碼不一致" });
            }
            // 3️⃣ 檢查是否已有相同 Email
            if (_users.Exists(u => u.Email.Equals(data.Email, StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest(new { message = "此信箱已註冊過" });
            }
            // 4️⃣ 密碼 Hash
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);

            // 5️⃣ 模擬存資料庫
            var newUser = new Entities.UserDB
            {
                User_id = Guid.NewGuid(),
                Name = data.Name,
                Email = data.Email,
                Password_hash = hashedPassword,
            };
            _users.Add(newUser);
            var names = _users.Select(u => u.Name).ToList();
            // 6️⃣ 回傳結果
            return Ok(new
            {
                status = "success",
                message = "註冊成功",
                userId = newUser.User_id,
                name = newUser.Name,
                newUser
            });
        }
    }
}