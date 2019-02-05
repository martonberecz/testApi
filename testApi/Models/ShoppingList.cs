using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testApi.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<item> Items { get; set; }

        public ShoppingList()
        {
            Id = 0;
            Name = string.Empty;
            Items = new List<item>();
        }
    }
}