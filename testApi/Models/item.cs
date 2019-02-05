using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testApi.Models
{
    public class item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Checked { get; set; }
        public int ShoppingListId { get; set; }

        public item()
        {
            Id = 0;
            Name = string.Empty;
            Checked = false;
            ShoppingListId = - 1;
        }

    }
}