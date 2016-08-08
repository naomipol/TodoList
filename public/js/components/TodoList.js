var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoStore = require('../stores/TodoStore')
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput');

var NewItem = React.createClass({

  getInitialState: function() {
    return {edit: false,
            text: ""};
  },

  handleChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleClick: function(e) {
    this.setState({edit: true});
  },

  addItem: function() {
    TodoActions.create(this.state.text);
    this.setState({edit: false, text: ''});
  },

  render: function() {
    var element;
    if(this.state.edit == true) {
      element = <div>
                  <input 
                    type="text"
                    placeholder="Add an item..."
                    value={this.state.text}
                    autoFocus={true}
                    onChange={this.handleChange}/>
                    <button onClick={this.addItem}>Add</button>
                </div>;
    } else {
      element = <span className="new-item" onClick={this.handleClick}>Add an item...</span>;
    }
    return (
      <div>
     {element}
     </div>
      );
  }
});

var TodoItem = React.createClass({

  propTypes: {
    item: ReactPropTypes.object
  },

  getInitialState: function() {
    return {edit: false};
  },

  handleCheck: function(e) {
    TodoActions.toggleComplete(this.props.item);
  },

  handleEdit: function() {
    this.setState({edit: true});
  },

  saveEdit: function(text) {
    this.setState({edit: false});
    TodoActions.editItem(this.props.item, text);
  },

  handleDelete: function() {
    TodoActions.deleteItem(this.props.item);
  },

  render: function() {
    var item;
    if(this.state.edit == true) {
      item = <TodoTextInput onSave={this.saveEdit} value={this.props.item.text} />;
    }
    else {
      item = <div>
              <input type="checkbox" checked={this.props.item.complete} onChange={this.handleCheck}/>
              <span className={(this.props.item.complete == true)  ? "checked" : ""}
                    onClick={this.handleEdit}>
                {this.props.item.text}
              </span>
              <span className="delete" onClick={this.handleDelete}>   x</span>
            </div>;
    }
    return (
      item
    );
  }
});

var TodoList = React.createClass({

  propTypes: {
    //id: ReactPropTypes.string,
    title: ReactPropTypes.string.isRequired,
    items: ReactPropTypes.object
  },

  getInitialState: function() {
    return {edit: false};
  },

  handleEdit: function() {
    this.setState({edit: true});
  },

  saveEdit: function(text) {
    this.setState({edit: false});
    TodoActions.editTitle(text);
  },

  // completeAll: function() {
  //   TodoActions.completeAll(this.props.items);
  // },

  render: function() {
    var items = this.props.items;
    var sumCompleted = TodoStore.getSumCompleted();
    var sum  = Object.keys(items).length;
    var todoItems = [];
    
    for(var id in items) {
      todoItems.push(<TodoItem key={id} item={items[id]}/>);
    }

    var title;
    if(this.state.edit == true) {
      title = <TodoTextInput onSave={this.saveEdit} value={this.props.title}/>;
    }
    else {
      title = <h3 onClick={this.handleEdit}>{this.props.title}</h3>;
    }
    
    return (
      <div className="list">
        {title}
        <b>{sumCompleted}/{sum}</b>
        <button onClick={this.completeAll}>complete all</button>
        {todoItems}
        <NewItem/>
      </div>
      );
  }
});

module.exports = TodoList;