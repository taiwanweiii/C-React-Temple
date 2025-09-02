using MySql.Data.MySqlClient;

namespace Server.Services
{
    /// <summary>
    /// DbService 負責管理 MySQL 連線
    /// </summary>
    public class DbService
    {
        private readonly string _connectionString;

        public DbService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("MySqlDb")
                ?? throw new Exception("❌ 缺少 MySqlDb 連線字串！");
        }

        /// <summary>
        /// 回傳新的 MySqlConnection (尚未開啟)
        /// 使用者需自己呼叫 conn.Open()
        /// </summary>
        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}