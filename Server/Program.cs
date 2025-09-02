using Microsoft.Extensions.DependencyInjection;
//Scalar套件:Ui openapi
using Scalar.AspNetCore;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);
string connStr = builder.Configuration.GetConnectionString("MySqlDb") ?? throw new InvalidOperationException("❌ 缺少 MySqlDb 連線字串！");
Console.WriteLine($"連線字串: {connStr}");
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// 註冊 Controller 支援
builder.Services.AddControllers();

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
app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html; charset=utf-8"; // ✅ 指定 UTF-8
    await context.Response.WriteAsync(@"
        <html>
            <head><title>API Test</title></head>
            <body>
                <h1>API is running!</h1>
                <p>可以測試其他 API，例如 <a href='/openapi/v1.json'>OPENAPI</a></p>
                <div>UI介面API:<a href='/scalar/'>Scral</a></div>
            </body>
        </html>
    ");
});
// 映射 Controller
app.MapControllers();

app.Run();

