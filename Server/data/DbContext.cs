using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Server.data
{
    public class WmDBContext : DbContext
    {
        public WmDBContext(DbContextOptions<WmDBContext> options) : base(options)
        {
            
        }
    }
}