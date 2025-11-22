using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model.Dto
{
    public class CartDto
    {
        public class AddToCartDto
        {
            public int UserId { get; set; }
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }
        public class RemoveCartItemDto
        {
            public int ProductId { get; set; }
        }
        public class UpdateCartItemQtyDto
        {
            public int ProductId { get; set; }
            public int Delta { get; set; }
        }

    }

}