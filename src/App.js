import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoList from './components/TodoList'


function randomString(len = 12) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    const char = possible.charAt(Math.floor(Math.random() * possible.length))
    text += char
  }
  return text
}


function newTodo(text, priority) {
  return {
    text,
    priority,
    id: randomString(),
    done: false,
  }
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.onCreateTodo = this.onCreateTodo.bind(this)
    this.onDeleteTodo = this.onDeleteTodo.bind(this)
    this.onToggleTodo = this.onToggleTodo.bind(this)
  }

  onCreateTodo(text, priority) {
    const todo = newTodo(text, priority)
    this.setState(prevState => ({
      todos: [...prevState.todos, todo]
    }))
  }

  onDeleteTodo(id) {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))
  }

  onToggleTodo(id) {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.done = !todo.done
        }
        return todo
      })
    }))
  }

  render() {
    return (
      <TodoList
        todos={this.state.todos}
        onCreateTodo={this.onCreateTodo}
        onDeleteTodo={this.onDeleteTodo}
        onToggleTodo={this.onToggleTodo}
      />
    )
  }
}


export default App
