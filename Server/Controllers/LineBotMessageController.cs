using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LineBotMessageController(LineBotServices lineBotServices) : ControllerBase
    {
        private readonly LineBotServices _lineBotServices = lineBotServices;

        [HttpPost]
        public async Task<IActionResult> ReplyMessage()
        {
            using var reader = new StreamReader(Request.Body, Encoding.UTF8);
            //拿到token 和訊息
            var result = await _lineBotServices.ReplyMessage(reader);
            if (result["status"].ToString() == "scuess")
            {
                // Console.WriteLine("收到LINE訊息");
                Console.WriteLine(result.GetType());
                Console.WriteLine(JsonConvert.SerializeObject(result));
                var _bot = _lineBotServices.Bot;
                _bot.ReplyMessage(result["replyToken"], $"你說的是: {result["message"]}");

                return Ok();
            }
            else if (result["status"].ToString() == "fail")
            {
                Console.WriteLine("無法處理請求，收到訊息為以下");
                Console.WriteLine(JsonConvert.SerializeObject(result));
                return Ok("無法處理請求");
            }

            return Ok();
        }
    }
}