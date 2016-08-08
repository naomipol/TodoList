var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('./stores/TodoStore')
var TodoActions = require('./actions/TodoActions');
var TodoList = require('./components/TodoList')

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
    if(this.state.items === null || this.state.items === undefined) {
      return null;
    }
    else {
      return (
        <TodoList items={this.state.items} title={this.state.title}/>
        );
    }
  }
});

TodoActions.initList();

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('content')
);
