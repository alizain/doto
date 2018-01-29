import React from 'react'
import classNames from 'classnames'
import SingleInputForm from './SingleInputForm'
import './TodoList.css'


function Todo({ todo, onDelete, onToggle }) {
  const classes = classNames({
    completed: todo.done
  })
  return (
    <li className={classes}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onClick={() => onToggle(todo.id)}/>
        <label>{todo.priority} - {todo.text}</label>
        <button
          className="destroy"
          onClick={() => onDelete(todo.id)}></button>
      </div>
    </li>
  )
}

function TodoHeader({ onCreateTodo }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <SingleInputForm className="new-todo" onSubmit={onCreateTodo}/>
    </header>
  )
}

function TodoContent({ todos, onDeleteTodo, onToggleTodo }) {
  if (!todos || todos.length <= 0) {
    return []
  }
  const allTodos = todos.map(todo =>
    <Todo
      key={todo.id}
      todo={todo}
      onDelete={onDeleteTodo}
      onToggle={onToggleTodo}/>
  )
  return (
    <section className="main">
      <ul className="todo-list">
        { allTodos }
      </ul>
    </section>
  )
}

function TodoPrioritySummary({ todos }) {
  const priorityTable = todos.reduce((accum, todo) => {
    if (accum[todo.priority] === undefined) {
      accum[todo.priority] = 0
    }
    accum[todo.priority] += 1
    return accum
  }, {})

  const foundPriorities = Object.keys(priorityTable)
    .map(priority => parseInt(priority))
    .sort()
  const maxPriority = foundPriorities[foundPriorities.length - 1]
  const summaries = []
  const missing = []

  for (let i = 1; i <= maxPriority; i++) {
    const count = priorityTable[i]
    if (count !== undefined) {
      if (count > 1) {
        summaries.push(<div key={i}>P{i}: {count} todos</div>)
      }
    } else {
      missing.push(i)
    }
  }

  let summariesContent = []
  if (summaries.length > 0) {
    summariesContent = (
      <div>
        <h3>Summaries</h3>
        {summaries}
      </div>
    )
  }

  let missingContent = []
  if (missing.length > 0) {
    missingContent = (
      <div>
        <h3>Missing</h3>
        <p>The priorities {missing.join(',')} are missing</p>
      </div>
    )
  }

  return (
    <div>
      {summariesContent}
      {missingContent}
    </div>
  )
}

export default function TodoList({ todos, onCreateTodo, onDeleteTodo, onToggleTodo }) {
  return (
    <section className="todoapp">
      <TodoHeader onCreateTodo={onCreateTodo} />
      <TodoContent todos={todos} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />
      <TodoPrioritySummary todos={todos} />
    </section>
  )
}
