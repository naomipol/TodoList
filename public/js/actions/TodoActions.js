var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');

TodoActions = {

  initList: function() {
    $.get({
        url: 'http://localhost:7001/items',
        success: function(listData) {
        AppDispatcher.dispatch({
          actionType: 'init',
          list: listData
        });
      }
    });
  },

  create: function(text) {
    $.post({
        url: 'http://localhost:7001/items',
        data: {text: text},
        success: function(item) {
        AppDispatcher.dispatch({
          actionType: 'create',
          item: item
        });
      }
    });
  },

  editTitle: function(text) {
    $.ajax({
      url: 'http://localhost:7001/items/title',
      type: 'PUT',
      data: {text: text},
      success: function(title) {
        AppDispatcher.dispatch({
          actionType: 'edit_title',
          text: title
        });
      }
    });
  },

  toggleComplete: function(item) {
    var updatedItem = assign({},item);
    updatedItem.complete = !item.complete;
    $.ajax({
      url: 'http://localhost:7001/items',
      type: 'PUT',
      data: updatedItem,
      success: function(item) {
        AppDispatcher.dispatch({
          actionType: 'update_item',
          item: item
        });
      }
    });
  },

  editItem: function(item,text) {
    if(item.text !== text) {
      var updatedItem = assign({},item);
      updatedItem.text = text;
      $.ajax({
        url: 'http://localhost:7001/items',
        type: 'PUT',
        data: updatedItem,
        success: function(item) {
          AppDispatcher.dispatch({
            actionType: 'update_item',
            item: item
          });
        }
      });
    }
  },

  deleteItem: function(item) {
    $.ajax({
      url: 'http://localhost:7001/items',
      type: 'DELETE',
      data: item,
      success: function(item) {
        AppDispatcher.dispatch({
          actionType: 'delete_item',
          item: item
        });
      }
    });
  },

  completeAll: function(items) {

    console.log("complete all");
    var updatedItems = assign({}, items);
    var itemsArray = [];
    for(id in updatedItems) {
      updatedItems[id].complete = true;
      itemsArray.push(updatedItems[id]);
    }
    console.log(itemsArray);
    var jsonObj = new Object();
    jsonObj.items = itemsArray;
    console.log(jsonObj);
    $.ajax({
      url: 'http://localhost:7001/items/all',
      type: 'POST',
      dataType: 'json',
      data: {items: itemsArray},
      success: function(items) {
        AppDispatcher.dispatch({
          actionType: 'complete',
          item: items
        });
      }
    });
  }

};

module.exports = TodoActions;