using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);

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
                <p>可以測試其他 API，例如 <a href='/api/hello/greet'>Hello API</a></p>
            </body>
        </html>
    ");
});
// 映射 Controller
app.MapControllers();

app.Run();

