using isRock.LineBot;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;

namespace Server.Services
{
    // [ApiController]
    // [Route("api/linebot")]
    public class LineBotServices
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
        public Bot Bot => _bot;

        // [HttpPost("reply")]
        public async Task<Dictionary<string, string>> ReplyMessage(StreamReader req)
        {
            // using var reader = new StreamReader(Request.Body, Encoding.UTF8);

            // var json = await reader.ReadToEndAsync();
            if (req is StreamReader reader)
            {
                var json = await req.ReadToEndAsync();
                // Console.WriteLine(json);
                var receivedMessage = JsonConvert.DeserializeObject<ReceivedMessage>(json);
                // Console.WriteLine("收到LINE訊息：" + JsonConvert.SerializeObject(receivedMessage));
                if (receivedMessage?.events != null && receivedMessage.events.Any())
                {
                    var ev = receivedMessage.events[0];
                    //回覆Token
                    string replyToken = ev.replyToken;

                    // 回覆收到的訊息
                    if (ev.message?.text != null)
                    {
                        // 只在終端打印，不回覆
                        // Console.WriteLine($"收到訊息: {ev.message.text}");

                        // Line 回覆訊息
                        // _bot.ReplyMessage(replyToken, $"你說的是: {ev.message.text}");
                    }
                    return new Dictionary<string, string>  {
                        {"status","scuess"},
                        { "replyToken", replyToken },
                        { "message", ev.message?.text ?? ""},
                        { "messageType", ev.message?.type ?? ""},
                        { "userId", ev.source.userId ?? "" },

                        { "type", ev.type ?? "" },
                        {"timestamp", ev.timestamp.ToString() }
                    };
                }
            }
            else
            {
                throw new InvalidOperationException("❌ 無法讀取請求內容！");
            }
            return new Dictionary<string, string>
        {
            {"status","fail"},
            {"message", "無法處理請求"}
        };
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