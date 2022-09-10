import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './task-list.css'

import Task from '../task'

export default class TaskList extends Component {
  state = {
    label: '',
  }

  onEditTask = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmitEdit = (e, id, newLabel) => {
    const { onEditTodo } = this.props
    const { label } = this.state
    e.preventDefault()
    onEditTodo(id, label === '' ? newLabel : label)
    this.setState({
      label: '',
    })
  }

  elements = (todoData, status) => {
    const { onDeleted, onChangeStatus } = this.props
    if (status === 'active') {
      todoData = todoData.filter((item) => !item.isCompleted)
    }
    if (status === 'complete') {
      todoData = todoData.filter((item) => item.isCompleted)
    }
    return todoData.map((item) => {
      const { label, id, isEditing, isCompleted } = item
      let classRender = ''
      if (isEditing) {
        classRender = 'editing'
      } else {
        classRender = isCompleted ? 'completed' : classRender
      }
      return (
        <li key={id} className={classRender}>
          <Task
            label={label || undefined}
            id={id}
            isCompleted={isCompleted}
            onDeleted={() => onDeleted(id)}
            onCompleted={() => onChangeStatus(id, 'isCompleted')}
            onEditing={() => onChangeStatus(id, 'isEditing')}
          />
          {isEditing ? (
            <form onSubmit={(e) => this.onSubmitEdit(e, id, label)}>
              <input type="text" className="edit" autoFocus onChange={this.onEditTask} defaultValue={label} />
            </form>
          ) : null}
        </li>
      )
    })
  }

  render() {
    const { todoData, renderStatus } = this.props
    const elements = this.elements(todoData, renderStatus)
    return <ul className="todo-list">{elements}</ul>
  }
}

TaskList.defaultProps = {
  onEditTodo: () => {},
  onChangeStatus: () => {},
}

TaskList.propTypes = {
  onEditTodo: PropTypes.func,
  onChangeStatus: PropTypes.func,
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
    })
  ).isRequired,
}
