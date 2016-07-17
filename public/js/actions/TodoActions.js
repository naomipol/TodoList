var AppDispatcher = require('../dispatcher/AppDispatcher');

TodoActions = {

  initList: function() {
    $.get({
        url: 'http://localhost:7001/items',
        success: function(listData) {
        list = JSON.parse(listData);
        AppDispatcher.dispatch({
          actionType: 'init',
          list: list
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
    AppDispatcher.dispatch({
      actionType: 'edit_title',
      text: text
    });
  },

  toggleComplete: function(id) {
    AppDispatcher.dispatch({
      actionType: 'toggle_complete',
      id: id
    });
  }

};

module.exports = TodoActions;