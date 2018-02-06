import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList, TodoForm, Footer} from './components/todo';
import {AddTodo, GenerateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService';

class App extends Component {

  state = {
    todos: [],
    currentTodo: ''
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({todos}));
  }

  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const newId = GenerateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = AddTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo).then( () => this.showTempMessage('todo added'));
  }

  showTempMessage = (msg) => {
    this.setState({message: msg});
    setTimeout(() => {
      this.setState({message: ''});
    }, 2500)
  }

  handleInputChange = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please supply To Do name'
    })
  }

  handleToggle = (id) => {
    const getToggleTodo = pipe(findById, toggleTodo);
    const updated = getToggleTodo(id, this.state.todos);
    const getUpdatedTodo = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodo(updated);
    // const getUpdatedTodo = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    // const updatedTodos = getUpdatedTodo(id, this.state.todos);
    this.setState({todos: updatedTodos})
    saveTodo(updated).then(() => this.showTempMessage('todo updated'))
  }

  handleRemove = (id, e) => {
    e.preventDefault;
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
    deleteTodo(id).then( () => this.showTempMessage('Todo deleted'))
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm 
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>
          <TodoList handleToggle={this.handleToggle} handleRemove={this.handleRemove} todos={displayTodos}/>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
