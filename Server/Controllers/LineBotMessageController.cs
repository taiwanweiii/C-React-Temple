using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/linebot/[controller]")]
    public class LineBotMessageController : ControllerBase
    {
        private readonly LineBotServices _lineBotService;
        private readonly SqlDbService _sqlDBService;
        public LineBotMessageController(LineBotServices lineBotService, SqlDbService sqlDBService)
        {
            _lineBotService = lineBotService;
            _sqlDBService = sqlDBService;
        }
        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            using var reader = new StreamReader(Request.Body);
            var json = await reader.ReadToEndAsync();
            // await _lineBotService.HandleWebhookAsync(json);
            Console.WriteLine("收到LINE訊息：" + json);
            Console.WriteLine(json.GetType());
            return Ok();
        }
        [HttpGet("action")]
        public async Task<IActionResult> GetColorNumber()
        {
            var results = new List<Dictionary<string, object>>();
            using var conn = _sqlDBService.GetConnection("WMDB");
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = "usp_SearchInventory";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            var param = new
            {
                CmdID = "QueryInventoryData",
                SearchTarget = "27068,27067,",
                SearchType = "0",
                SearchCondition = "0",
                SearchPurchase = "",
                SalesType = "0,",
                CatalogId = ""
            };
            string jsonParam = JsonConvert.SerializeObject(param);


            cmd.Parameters.Add(new SqlParameter("@json", jsonParam));

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    string columnName = reader.GetName(i);
                    object value = reader.GetValue(i);
                    row[columnName] = value;
                }
                results.Add(row);
            }
            return Ok(results);
        }
    }
}