import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { addTodo } = this.props
    const { label } = this.state
    e.preventDefault()
    addTodo(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          autoFocus
          placeholder="What needs to be done?"
          onChange={this.onChange}
          value={label}
        />
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
