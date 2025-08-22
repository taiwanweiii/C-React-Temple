using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]               // ✅ 標記 Controller
    [Route("api/[controller]")]   // ✅ 設定路由
    public class Test : ControllerBase
    {

        [HttpGet("[action]")]     // ✅ 對應 GET /api/User/greet
        public IActionResult T() => Ok(new { message = "Hello World" });
    }
}