using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Dto = Server.Model.Dto;  // 取別名 Dto
using Entities = Server.Model.Entities;  // 取別名 
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

using Server.Model.data;
using System.Text.Json;

namespace Server.Controllers
{
    /// <summary>
    /// 產品相關的控制器
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductsController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;

        /// <summary>
        /// 查詢產品列表
        /// </summary>
        /// <returns>產品列表</returns>
        #region API /GetProducts
        [HttpPost]
        [EndpointSummary("查詢產品列表")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        [Authorize]
        #endregion
        public async Task<IActionResult> GetProducts([FromBody] Dto.Products.GetProductsDto data)
        {
            string categoryId = data.Category?.ToString() ?? "";
            if (!ModelState.IsValid)
            {
                return Ok(new Dto.ApiResponse<object>
                {
                    Status = "fail",
                    Message = "資料格式錯誤",
                    Data = ModelState
                });
            }
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int? userId = null;
            if (!string.IsNullOrEmpty(userIdStr)) userId = int.Parse(userIdStr);

            var query = _dbContext.V_products_category.AsQueryable();
            if (categoryId != "" && categoryId != "1")
            {
                query = query.Where(v =>
                    v.Category_id != null &&
                    EF.Functions.Like("," + v.Category_id + ",", "%," + categoryId + ",%")
                );
            }
            // 過濾 deleted_at 為 null(還沒刪除) 且 online 不等於 0 的產品 (表示上架中)
            query = query.Where(v => v.Deleted_at == null && v.Online != 0);

            // 如果有登入，則查詢該使用者購物車中的產品數量
            if (userId != null)
            {
                var productsWithCartQty = await query.GroupJoin(
                    _dbContext.Cart.Where(c => c.User_id == userId && c.Deleted_at == null),
                    product => product.Id,            // V_products_category.id
                    cart => cart.Product_id,          // cart.product_id
                    (product, cartItems) => new
                    {
                        product.Id,
                        product.Title,
                        product.Descript,
                        product.Img,
                        product.Price,
                        product.Customize,
                        product.Online,
                        product.Status,
                        product.Company_id,
                        product.Category_id,
                        product.Category_name_en,
                        product.Category_name_zh,
                        product.Created_at,
                        product.Updated_at,
                        product.Deleted_at,
                        cartQuantity = cartItems.Sum(c => (int?)c.Quantity) ?? 0
                    }).ToListAsync();
                return Ok(new Dto.ApiResponse<object>
                {
                    Status = "success",
                    Message = "取得產品列表成功",
                    Data = productsWithCartQty
                });
            }

            var products = await query.ToListAsync();
            return Ok(new Dto.ApiResponse<object>
            {
                Status = "success",
                Message = "取得產品列表成功",
                Data = products
            });
        }

        /// <summary>
        /// 查詢產品群組
        /// </summary>
        /// <returns>產品群組</returns>
        #region API /GetProductsGroup
        [HttpPost]
        [EndpointSummary("查詢產品群組")]
        [EndpointDescription(@"
        * 參數涵蓋()
        回傳 status 'success:成功' 'error:失敗'
        ")]
        #endregion
        public async Task<IActionResult> GetProductsGroup()
        {
            var products = await _dbContext.ProductsGroup
                .Where(p => p.Deleted_at == null) // 過濾掉已刪除
                .Select(p => new
                {
                    p.Category_id,
                    p.Category_name_zh,
                    p.Category_name_en
                })
                .ToListAsync();
            return Ok(new Dto.ApiResponse<object>
            {
                Status = "success",
                Message = "讀取產品群組成功",
                Data = products
            });
        }
    }
}