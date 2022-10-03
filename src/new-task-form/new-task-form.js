import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default function NewTaskForm({ addTodo }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addTodo(text, min, sec)
    setText('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        step="1"
        min="0"
        max="59"
        required
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        step="1"
        min="0"
        max="59"
        required
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}

NewTaskForm.defaultProps = {
  addTodo: () => {},
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func,
}
