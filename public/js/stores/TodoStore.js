var AppDispatcher = require('../dispatcher/AppDispatcher');
var events = require('events');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _todoList = null;

var initList = function(list) {
  var itemsObject = {};
  list.items.map(function(i) {
    itemsObject[i.id] = i;
  })
  list.items = itemsObject;
  _todoList = list;
}

var createItem = function(item) {
  _todoList.items[item.id] = item;
}

var editTitle = function(text) {
  _todoList.title = text;
}

var toggleComplete = function(id) {
  _todoList.items[id].complete = ! _todoList.items[id].complete;
}

var TodoStore = assign({}, events.EventEmitter.prototype, {

  getAll: function() {
    if(_todoList !== null) {
      return _todoList.items;
    }
  },

  getTitle: function() {
    if(_todoList !== null) {
      return _todoList.title;
    }
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
    case 'init':
      initList(action.list);
      TodoStore.emitChange();
      break;

    case 'create':
      createItem(action.item);
      TodoStore.emitChange();
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



