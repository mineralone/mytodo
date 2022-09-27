import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { addTodo } = this.props
    const { label, min, sec } = this.state
    e.preventDefault()
    addTodo(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChangeLabel}
          value={label}
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
          onChange={this.onChangeMin}
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
          onChange={this.onChangeSec}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  addTodo: () => {},
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func,
}
