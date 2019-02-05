var currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    //initializing the current list(array object)
    currentList.items = new Array();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList/",
        data: currentList,
        success: function (result) { //what to do if success            
            showShoppingList();
        }
    });

    //call it here if no ajax call
    //showShoppingList();
}


function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name);
    $("#shopingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    //to put the cursore into the text field on page load
    $("#newItemName").focus();

    //listening for key press 13 for enter therefore, no need to click
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    newItem.shoppingListId = currentList.id; //add the list id 

    currentList.items.push(newItem);

    //send the new item to the web service
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Item/",
        data: newItem,
        success: function (result) { //what to do if success            
            currentList = result;
            drawItems();
            $("#newItemName").val("");
        }
    });
    /*****This below to test it without API*****/
    /*//to test it
    console.info(currentList);

    drawItems();

    //to clear the text field
    drawItems();
    $("#newItemName").val("");*/
}

function drawItems() {
    //this is an object not a variable
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);

        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i + ")'>C</button>").appendTo($li);

        //* checked value from the API*/
        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    //remove one item from the array passed in by the index
    currentList.items.splice(index, 1);

    //drawItems to see the list 
    drawItems();
}

function checkItem(index) {

    var item = currentList.items[index];
    //change the checked prop with just flipping the value
    item.checked = !item.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + index,
        data: item,
        success: function (result) { //what to do if success
            currentList = result; //if the model has different nameing conventions (capital letters the jason serialazation has to be configured in the app_START/webapiconfig.cs)
            drawItems();
        }
    });

    /*****code without API****//*
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked"); //add css to the item
    } else {
        $("#item_" + index).addClass("checked"); //add css to the item
    }*/

}

function getShoppingListById(id) {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function (result) { //what to do if success
            currentList = result; //if the model has different nameing conventions (capital letters the jason serialazation has to be configured in the app_START/webapiconfig.cs)
            showShoppingList();
            drawItems();
        }
    });

    /***** For test with out ajax ***/
    //console.info(id);

    //currentList.name = "Demo List";
    //currentList.items = [
    //    { name: 'cat' },
    //    { name: 'bumblefuck' },
    //    { name: 'dog' }
    //];

    //showShoppingList();
    //drawItems();



}


$(document).ready(function () {
    console.info("ready");

    //to put the cursore into the text field on page load
    $("#shoppingListName").focus();

    //listening for key press 13 for enter therefore, no need to click
    $("#shoppingListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }
    });

    //get the url to load a certain list by id
    //mimking a api call
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");

    //if there is an index substing
    if (idIndex != -1) {
        getShoppingListById(pageUrl.substr(idIndex + 4)); //+4 cause the 4th index the id starts
    }
});