using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model.Dto.User
{
    /// <summary>
    /// 會員註冊資料模型
    /// </summary>
    public class RegisterDto
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }
        public required DateTime Birthday { get; set; }
        public required string Gender { get; set; }
        public required string Phone { get; set; }

    }

    public class LoginDto
    {
        public required string Address { get; set; }
        public required string Password { get; set; }
    }

    public class UpdateProfileDto
    {
        public string? Username { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string? Gender { get; set; }
        public string? Birthday { get; set; }
    }
}