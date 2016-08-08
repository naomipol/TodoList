var AppDispatcher = require('../dispatcher/AppDispatcher');
var events = require('events');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _todoList = null;

var mapify = function(items) {
  var itemsObject = {};
  items.map(function(i) {
    i.complete = JSON.parse(i.complete);
    itemsObject[i.id] = i;
  });
  return itemsObject;
}

var initList = function(list) {
  list.items = mapify(list.items);
  _todoList = list;
}

var createItem = function(item) {
  _todoList.items[item.id] = item;
}

var editTitle = function(text) {
  _todoList.title = text;
}

var updateItem = function(item) {
  item.complete = JSON.parse(item.complete);
  _todoList.items[item.id] = item;
}

var deleteItem = function(item) {
  delete _todoList.items[item.id];
}

var completeAll = function(items) {
  _todoList.items = mapify(items);
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

  getSumCompleted: function() {
    var sum = 0;
    for (var id in _todoList.items) {
      if (_todoList.items[id].complete) {
        sum++;
      }
    }
    return sum;
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
      editTitle(action.text);
      TodoStore.emitChange();
      break;

    case 'update_item':
      updateItem(action.item);
      TodoStore.emitChange();
      break;

    case 'delete_item':
      deleteItem(action.item);
      TodoStore.emitChange();
      break;

    case 'complete_all':
      completeAll(action.items);
      TodoStore.emitChange();
      break;
    
    default:
  }
});

module.exports = TodoStore;



