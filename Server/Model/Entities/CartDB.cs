using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Model.Entities
{
    [Table("cart")] // 資料庫裡實際名稱
    public class CartDB : BaseEntity
    {
        public int Id { get; set; }
        public int User_id { get; set; }
        public int Product_id { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}