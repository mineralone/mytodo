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

  onKeyDown = (e, id) => {
    if (e.key === 'Escape') {
      const { onChangeStatus } = this.props
      onChangeStatus(id, 'isEditing')
    }
  }

  elements = (todoData, status) => {
    const { onDeleted, onChangeStatus, onToggleTimer, timerFn } = this.props
    if (status === 'active') {
      todoData = todoData.filter((item) => !item.isCompleted)
    }
    if (status === 'completed') {
      todoData = todoData.filter((item) => item.isCompleted)
    }
    return todoData.map((item) => {
      const { label, id, isEditing, isCompleted, secTimer, timer, date } = item
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
            secTimer={secTimer}
            id={id}
            isCompleted={isCompleted}
            onDeleted={() => onDeleted(id)}
            onCompleted={() => onChangeStatus(id, 'isCompleted')}
            onEditing={() => onChangeStatus(id, 'isEditing')}
            onToggleTimer={onToggleTimer}
            timer={timer}
            timerFn={() => timerFn(id)}
            date={date}
          />
          {isEditing ? (
            <form onSubmit={(e) => this.onSubmitEdit(e, id, label)} onKeyDown={(e) => this.onKeyDown(e, id)}>
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
