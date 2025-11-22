using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Model.Entities
{
    #region 
    /// <summary>
    /// 代表使用者資料庫中的user_log實體。
    /// </summary>
    /// <remarks>
    /// 此類別映射至資料庫中的user表格，包含使用者的基本資訊。
    /// </remarks>
    #endregion
    [Table("user_update_log")] // 指定資料表名稱
    public class UserUpdateLogDB
    {
        #region ---資料庫說明---
        /// <summary>
        /// ID 流水號 INT 主鍵、自動增量
        /// user_id 使用者ID INT
        /// Username 使用者帳號
        /// Email 使用者信箱
        /// Birthday 生日
        /// creat_time 建立時間 DATETIME 歷史記錄時間
        /// </summary>
        #endregion
        public int Id { get; set; }
        public int User_id { get; set; }
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime Birthday { get; set; }
        public string Gender { get; set; } = "";
        public string Role { get; set; } = "";
        public string Pw { get; set; } = "";
        public int? Add_user_id { get; set; }
    }
}