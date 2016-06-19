var AppDispatcher = require('../dispatcher/AppDispatcher');
var events = require('events');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _todoList = {items: {}, title: 'Todos...'};

var createItem = function(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todoList.items[id] = ({id: id, text: text, complete: false});
}

var editTitle = function(text) {
  _todoList.title = text;
}

var toggleComplete = function(id) {
  _todoList.items[id].complete = ! _todoList.items[id].complete;
}

var TodoStore = assign({}, events.EventEmitter.prototype, {

  getAll: function() {
    return _todoList.items;
  },

  getTitle: function() {
    return _todoList.title;
  },

   emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  
  switch(action.actionType)
  {
    case 'create':
      var text = action.text.trim();
      if(text !== '') {
        createItem(text);
        TodoStore.emitChange();
      }
      break;
    
    case 'edit_title':
      var text = action.text.trim();
      if(text !== '') {
        editTitle(text);
        TodoStore.emitChange();
      }
      break;
    
    case 'toggle_complete':
      toggleComplete(action.id);
      TodoStore.emitChange();
      break;
    
    default:
  }
});

module.exports = TodoStore;



