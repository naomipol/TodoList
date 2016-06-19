var AppDispatcher = require('../dispatcher/AppDispatcher');

TodoActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: 'create',
      text: text
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