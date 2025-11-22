using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Model.Entities
{
    [Table("products")] // 資料庫裡實際名稱
    public class ProductsDB : BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Descript { get; set; } = "";
        public string Img { get; set; } = "";
        public int Price { get; set; } = 0;
        public int Customize { get; set; } = 0;
        //棄用 
        // public string Category { get; set; } = "";
        public int Online { get; set; } = 0;
        public string Status { get; set; } = "";
        public string Company_id { get; set; } = "";
    }
}