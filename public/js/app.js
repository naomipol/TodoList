var React = require('react');
var ReactDOM = require('react-dom');

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
    items.push({id: 2, text: this.state.text});
    console.log(items);
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
  getInitialState: function() {
    return {checked: this.props.checked};
  },
  handleCheck: function(e) {
    this.setState({checked: e.target.checked});
  },
  render: function() {
    return (
      <div>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleCheck}/>
        <span className={(this.state.checked == true)  ? "checked" : ""}>
          {this.props.text}
        </span>
      </div>
    );
  }
});

var TodoList = React.createClass({

  render: function() {
    var todoItems = this.props.items.map(function(item) {
      return (
        <TodoItem key={item.id} text={item.text} checked={item.checked}/>
        );
    });

    return (
      <div className="list">
        <h3>{this.props.title}</h3>
        {todoItems}
        <NewItem addItem={this.props.addItem}/>
      </div>
      );
  }
});

var ListContainer = React.createClass({
  getInitialState: function() {
    var items = [{id: 0, text: 'learn about react', checked: true}, {id: 1, text: 'learn about om/next', checked: false}];
    return {items: items}
  },
  addItem: function(newItem) {
    this.setState({items: items.push(newItem)});
  },
  render: function() {
    return (
      <TodoList items={this.state.items} addItem={this.addItem} title="To Learn"/>
      );
  }
});

var items = [{id: 1, text: "learn react"}, {id: 2, text: "learn node"}];

ReactDOM.render(
  <TodoList items={items} title="To Learn"/>,
  document.getElementById('content')
);
