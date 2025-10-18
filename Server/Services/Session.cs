using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Model.data;
using Microsoft.EntityFrameworkCore;
namespace Server.Services
{

    public class Session(IHttpContextAccessor httpContextAccessor, AppDbContext dbcontext)
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly AppDbContext _dbcontext = dbcontext;

    }
}