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
        public required  string Name { get; set; }
        public required  string Email { get; set; }
        public required  string Password { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}