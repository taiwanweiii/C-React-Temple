using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Server.Model.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Entities.UserDB> User { get; set; } = null!;
        public DbSet<Entities.UserUpdateLogDB> UserUpdateLog { get; set; } = null!;

        public DbSet<Entities.ProductsDB> Products { get; set; } = null!;
        public DbSet<Entities.ProductsGroupDB> ProductsGroup { get; set; } = null!;

        public DbSet<Entities.CartDB> Cart { get; set; } = null!;

        //View
        public DbSet<Entities.V_products_categoryDB> V_products_category { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Entities.V_products_categoryDB>()
                .ToView("v_products_category")   // 這裡填 MySQL 真實的 View 名稱
                .HasNoKey();                     // View 沒有主鍵一定要寫這行
        }
    }
}