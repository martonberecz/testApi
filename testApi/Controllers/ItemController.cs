using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace testApi.Controllers
{
    public class ItemController : ApiController
    {
        // GET: api/Item
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Item/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Item
        public IHttpActionResult Post([FromBody]Models.item item)
        {
            //this can be accessed if the list is static in the shopingListctr
            Models.ShoppingList shoppingList = ShoppingListController.
                                                shoppingLists.Where(s => s.Id == item.ShoppingListId).
                                                FirstOrDefault();
            if(shoppingList == null)
            {
                return NotFound();
            }

            //shoppingList.Items.Add(item);

            //to give unique id for the items
            item.Id = shoppingList.Items.Max(i => i.Id) + 1;
            shoppingList.Items.Add(item);

            return Ok(shoppingList);
        }

        // PUT: api/Item/5
        public IHttpActionResult Put(int id, [FromBody]Models.item item)
        {
            //this can be accessed if the list is static in the shopingListctr
            Models.ShoppingList shoppingList = ShoppingListController.
                                                shoppingLists.Where(s => s.Id == item.ShoppingListId).
                                                FirstOrDefault();
            if (shoppingList == null)
            {
                return NotFound();
            }

            Models.item changedItem = shoppingList.Items.Where(i => i.Id == id).FirstOrDefault();

            if (changedItem == null)
            {
                return NotFound();
            }

            //set the property of the value that was given by the api
            changedItem.Checked = item.Checked;

            return Ok(shoppingList);
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}
