using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Server.Model.Entities
{
    #region 
    /// <summary>
    /// 代表使用者資料庫中的user實體。
    /// </summary>
    /// <remarks>
    /// 此類別映射至資料庫中的user表格，包含使用者的基本資訊。
    /// </remarks>
    #endregion
    [Table("user")] // 指定資料表名稱
    public class UserDB
    {
        #region ---資料庫說明---
        /// <summary>
        /// user_id 流水號
        /// Name 使用者帳號
        /// Email 使用者信箱
        /// Password_hash 使用者加密密碼
        /// Birthday 生日
        /// Nickname 暱稱 && 別稱 可存在可不存在
        /// </summary>
        #endregion
        [Key] // EF Core 主鍵
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime Birthday { get; set; }
        public string Gender { get; set; } = "";
        public string Role { get; set; } = "";
        public string Pw { get; set; } = "";
    }
}