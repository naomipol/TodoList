var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('./stores/TodoStore')
var TodoActions = require('./actions/TodoActions');

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

  handleCheck: function(e) {
    TodoActions.toggleComplete(this.props.item.id);
  },

  render: function() {
    return (
      <div>
        <input type="checkbox" checked={this.props.item.complete} onChange={this.handleCheck}/>
        <span className={(this.props.item.complete == true)  ? "checked" : ""}>
          {this.props.item.text}
        </span>
      </div>
    );
  }
});

var TodoList = React.createClass({

  render: function() {
    var items = this.props.items;
    var todoItems = [];
    
      for(var id in items) {
      todoItems.push(<TodoItem key={id} item={items[id]}/>);
    }
    
    return (
      <div className="list">
        <h3>{this.props.title}</h3>
        {todoItems}
        <NewItem/>
      </div>
      );
  }
});

var getTodoState = function() {
    return {
      items: TodoStore.getAll(),
      title: TodoStore.getTitle()
    };
  };

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getTodoState());
  },

  render: function() {
    return (
      <TodoList items={this.state.items} title={this.state.title}/>
      );
  }
});

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('content')
);
