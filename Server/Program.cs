using Microsoft.Extensions.DependencyInjection;
//Scalar套件:Ui openapi
using Scalar.AspNetCore;
using MySql.Data.MySqlClient;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;   // 🔑 SymmetricSecurityKey 在這裡
using System.IdentityModel.Tokens.Jwt;  // 🧾 JwtSecurityToken 在這裡
using System.Security.Claims;           // 👤 Claim

var builder = WebApplication.CreateBuilder(args);
string connStr = builder.Configuration.GetConnectionString("MySqlDb") ?? throw new InvalidOperationException("❌ 缺少 MySqlDb 連線字串！");
Console.WriteLine($"連線字串: {connStr}");
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// 註冊 Controller 支援
builder.Services.AddControllers();
// 注入DbContext
builder.Services.AddDbContext<Server.Model.data.AppDbContext>(options =>
    options.UseMySql(connStr, ServerVersion.AutoDetect(connStr))
);
//啟動Session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // 設定 Session 過期時間
    options.Cookie.HttpOnly = true; // 設定 Cookie 為 HttpOnly
    options.Cookie.IsEssential = true; // 設定 Cookie 為必要   
});
//註冊JWT服務
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        var jwt = builder.Configuration.GetSection("Jwt");
        var key = jwt["Key"] ?? throw new InvalidOperationException("JWT Key not configured.");
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwt["Issuer"],
            ValidAudience = jwt["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(key))
        };
    });
//註冊CORS服務
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // ✅ 要寫 port
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // ✅ 若要帶 cookie 一定要加
    });
});

builder.Services.AddAuthorization();
//註冊lineBot服務
builder.Services.AddTransient<Server.Services.LineBotServices>();
//註冊JWT服務
builder.Services.AddTransient<Server.Services.IJwtService, Server.Services.JwtService>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.WithTitle("My API")
            .WithSidebar(true)
            .WithDarkMode(true);
    });
}


// app.UseHttpsRedirection();
// app.MapGet("/", async context =>
// {
//     context.Response.ContentType = "text/html; charset=utf-8"; // ✅ 指定 UTF-8
//     await context.Response.WriteAsync(@"
//         <html>
//             <head><title>API Test</title></head>
//             <body>
//                 <h1>API is running!</h1>
//                 <p>可以測試其他 API，例如 <a href='/openapi/v1.json'>OPENAPI</a></p>
//                 <div>UI介面API:<a href='/scalar/'>Scral</a></div>
//             </body>
//         </html>
//     ");
// });
// 啟用 wwwroot 靜態檔案服務
app.UseStaticFiles();
// React SPA router fallback
app.MapFallbackToFile("index.html");

// 映射 Controller
app.MapControllers();
//啟動session
app.UseSession();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
// 設定監聽容器內 port，例如 5003

app.Urls.Add("http://+:5003");

app.Run();

