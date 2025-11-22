using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Model.Entities
{
    [Table("products_group")] // 指定資料表名稱
    public class ProductsGroupDB : BaseEntity
    {
        [Key]
        public int Category_id { get; set; }
        public string Category_name_en { get; set; } = "";
        public string Category_name_zh { get; set; } = "";

    }
}