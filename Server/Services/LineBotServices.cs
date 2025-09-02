using isRock.LineBot;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;

namespace Server.Services
{
    [ApiController]
    [Route("api/linebot")]
    public class LineBotServices : ControllerBase
    {
        private readonly string _channelAccessToken;
        private readonly string _channelSecret;
        private readonly Bot _bot;

        public LineBotServices(IConfiguration configuration)
        {
            _channelAccessToken = configuration["LineBot:ChannelAccessToken"] ?? throw new InvalidOperationException("❌ 缺少 LineBot ChannelAccessToken ！");
            _channelSecret = configuration["LineBot:ChannelSecret"] ?? throw new InvalidOperationException("❌ 缺少 LineBot ChannelSecret ！");
            // 初始化 Bot
            _bot = new Bot(_channelAccessToken);
        }
        // 取得 Bot 實例
        public Bot GetBot()
        {
            return _bot;
        }
        [HttpPost("reply")]
        public async Task<IActionResult> ReplyMessage()
        {
            using var reader = new StreamReader(Request.Body, Encoding.UTF8);

            var json = await reader.ReadToEndAsync();

            // 將 JSON 轉成物件
            var receivedMessage = JsonConvert.DeserializeObject<ReceivedMessage>(json);
            Console.WriteLine("收到LINE訊息：" + JsonConvert.SerializeObject(receivedMessage));
            if (receivedMessage?.events != null)
            {
                foreach (var ev in receivedMessage.events)
                {
                    //回覆Token
                    string replyToken = ev.replyToken;

                    // 回覆收到的訊息
                    if (ev.message?.text != null)
                    {
                        // 只在終端打印，不回覆
                        Console.WriteLine($"收到訊息: {ev.message.text}");
                        _bot.ReplyMessage(replyToken, $"你說的是: {ev.message.text}");
                    }
                }
            }

            return Ok();
        }
        // [HttpPost]
        // public IActionResult ReplyMessage()
        // {
        //     var msg = this.ReceivedMessage;
        //     if (msg.events != null)
        //     {
        //         Console.WriteLine("收到LINE訊息：");
        //         Console.WriteLine(msg);
        //     }
        //     return Ok();
        // }

    };
    // public Bot GetLineBot()
    // {
    //     return new Bot(ChannelAccessToken, ChannelSecret);
    // }
}