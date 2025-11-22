using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Model.data;
using System;
using Dto = Server.Model.Dto;
using Entities = Server.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers
{
    /// <summary>
    /// 產品購物車相關的控制器
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]   // ✅ 設定路由
    [Authorize]
    public class CartController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        /// <summary>
        /// 新增購物車
        /// </summary>
        #region API /AddToCart
        [HttpPost()]
        [EndpointSummary("新增購物車")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        #endregion
        public async Task<IActionResult> AddToCart([FromBody] Dto.CartDto.AddToCartDto data)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new
                {
                    Status = "error",
                    Message = "使用者未登入"
                });
            }
            Console.WriteLine("目前操作的使用者 ID：" + userId);
            // 1. 依照 ProductId 撈出該商品
            var product = await _dbContext.Products
                .FirstOrDefaultAsync(p => p.Id == data.ProductId);
            // 判斷商品是否存在
            if (product == null)
            {
                return Ok(new
                {
                    Status = "warn",
                    Message = "找不到商品"
                });
            }
            // 判斷商品是否上限
            if (product.Online == 0)
            {
                return Ok(new
                {
                    Status = "warn",
                    Message = "商品已下架，無法加入購物車"
                });
            }

            // 3. 取得商品價格
            decimal price = product.Price;

            // 4. 檢查購物車是否已有這筆商品
            var existingItem = await _dbContext.Cart
                .FirstOrDefaultAsync(c =>
                    c.User_id == int.Parse(userId) &&
                    c.Product_id == data.ProductId &&
                    c.Deleted_at == null
                );
            // 4A. 如果已存在 → 更新數量
            if (existingItem != null)
            {
                existingItem.Quantity += data.Quantity;
                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    Status = "success",
                    Message = "商品已存在購物車，已更新數量",
                });
            }
            // 4B. 新增購物車資料
            _dbContext.Cart.Add(new Model.Entities.CartDB
            {
                User_id = int.Parse(userId),
                Product_id = data.ProductId,
                Quantity = data.Quantity,
                Price = price,
            });
            await _dbContext.SaveChangesAsync();
            // 4. 回傳結果
            return Ok(new
            {
                Status = "success",
                Message = "新增購物車成功",
            });
        }

        #region API /GetCartItems
        [HttpGet]
        [EndpointSummary("取得購物車列表")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        #endregion
        public async Task<IActionResult> GetCartItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 0.ToString();
            Console.WriteLine("目前操作的使用者 ID：" + userId);
            var cartItems = await (
                from c in _dbContext.Cart
                join p in _dbContext.Products
                    on c.Product_id equals p.Id
                where c.User_id == int.Parse(userId) && p.Deleted_at == null && p.Online == 1 && c.Deleted_at == null
                select new
                {
                    c.User_id,
                    id = c.Product_id,
                    p.Title,
                    p.Descript,
                    p.Img,
                    qty = c.Quantity,
                    price = c.Price,
                }
            ).ToListAsync();
            Console.WriteLine($"取得購物車列表，共 {System.Text.Json.JsonSerializer.Serialize(cartItems)} 項目");
            return Ok(new
            {
                Status = "success",
                Message = "取得購物車列表成功",
                data = cartItems
            });
        }

        #region API /RemoveCartItem
        [HttpDelete]
        [EndpointSummary("移除購物車項目")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        [Authorize]
        #endregion
        public async Task<IActionResult> RemoveCartItem([FromBody] Dto.CartDto.RemoveCartItemDto data)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var productId = data.ProductId;
            if (userId == null)
            {
                return Unauthorized(new
                {
                    Status = "error",
                    Message = "使用者未登入"
                });
            }
            // 1. 找到購物車項目
            var cartItem = await _dbContext.Cart
                .FirstOrDefaultAsync(c => c.User_id == int.Parse(userId) && c.Product_id == productId && c.Deleted_at == null);
            if (cartItem != null)
            {
                // 2. 更新 Deleted_at
                cartItem.Deleted_at = DateTime.Now;
                // 3. 儲存變更
                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    Status = "success",
                    Message = "購物車項目已標記為刪除"
                });
            }
            else
            {
                return NotFound(new
                {
                    Status = "error",
                    Message = "找不到指定的購物車項目"
                });
            }
        }

        #region API /UpdateCartItemQty
        [HttpPut]
        [EndpointSummary("更新購物車項目數量")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        [Authorize]
        #endregion
        public async Task<IActionResult> UpdateCartItemQty([FromBody] Dto.CartDto.UpdateCartItemQtyDto data)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var productId = data.ProductId;
            var delta = data.Delta;
            if (userId == null)
            {
                return Unauthorized(new
                {
                    Status = "error",
                    Message = "使用者未登入"
                });
            }
            // 1. 找到購物車項目
            var cartItem = await _dbContext.Cart
                .FirstOrDefaultAsync(c => c.User_id == int.Parse(userId) && c.Product_id == productId && c.Deleted_at == null);
            if (cartItem != null)
            {
                // 2. 更新數量
                cartItem.Quantity += delta;
                if (cartItem.Quantity < 1)
                {
                    cartItem.Quantity = 1; // 最小數量為 1
                }
            }
            else
            {
                return NotFound(new
                {
                    Status = "error",
                    Message = "找不到指定的購物車項目"
                });
            }
            // 3. 儲存變更
            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                Status = "success",
                Message = "購物車項目數量已更新"
            });
        }
    }
}