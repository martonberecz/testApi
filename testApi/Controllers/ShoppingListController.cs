using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using testApi.Models;

namespace testApi.Controllers
{
    public class ShoppingListController : ApiController
    {

        //create a list for get
        public static List<ShoppingList> shoppingLists = new List<ShoppingList> //in order to access it from item ctr
        {
            new ShoppingList() {Id = 0, Name = "Groceries", Items = {
                    new item {Id = 0,Name = "butt plug", ShoppingListId = 0},
                    new item {Id = 1,Name = "arti cock", ShoppingListId = 0},
                    new item {Id = 2,Name = "horse", ShoppingListId = 0}
                    }
                },
            new ShoppingList() {Id = 1, Name = "Dildo"}
        };

        // GET: api/ShoppingList/5
        public IHttpActionResult Get(int id) //use actionresult instead of string in order to have a 404(not found) and halt or 200(result)
        {
            ShoppingList result = shoppingLists.FirstOrDefault(s => s.Id == id); //linked statement to get the id

            if(result == null)
            {
                //if this is not set the empty result will pass with no error!
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/ShoppingList
        public System.Collections.IEnumerable Post([FromBody]ShoppingList newList)  //to send the whole package list back to the client for testing
        {
            newList.Id = shoppingLists.Count; //to give a unique id for each list(for test)
            shoppingLists.Add(newList);

            return shoppingLists;
        }
    }
}
