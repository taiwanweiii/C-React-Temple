using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
        public Guid User_id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password_hash { get; set; } = "";
        public string Birthday { get; set; } = "";

        [NotMapped]
        public string Nickname { get; set; } = "";

    }
}