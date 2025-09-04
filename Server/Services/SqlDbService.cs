using Microsoft.Data.SqlClient;

namespace Server.Services
{
    /// <summary>
    /// DbService 負責管理 資料庫 連線
    /// </summary>
    public class SqlDbService
    {
        private readonly IConfiguration _config;

        public SqlDbService(IConfiguration config)
        {
            _config = config;
        }

        /// <summary>
        /// 回傳新的 MySqlConnection (尚未開啟)
        /// 使用者需自己呼叫 conn.Open()
        /// </summary>
        public SqlConnection GetConnection(string dbKey)
        {
            var connStr = _config.GetConnectionString(dbKey)
                               ?? throw new Exception($"❌ 缺少 {dbKey} 連線字串！");
            return new SqlConnection(connStr);
        }
    }
}