import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './task-list.css'

import Task from '../task'

export default function TaskList({
  onEditTodo,
  onDeleted,
  onChangeStatus,
  onToggleTimer,
  timerFn,
  todoData,
  renderStatus,
}) {
  const [text, setText] = useState('')

  const onSubmitEdit = (e, id, newLabel) => {
    e.preventDefault()
    onEditTodo(id, text === '' ? newLabel : text)
    setText('')
  }

  const onKeyDown = (e, id) => {
    if (e.key === 'Escape') onChangeStatus(id, 'isEditing')
  }

  const elements = () => {
    if (renderStatus === 'active') {
      todoData = todoData.filter((item) => !item.isCompleted)
    }
    if (renderStatus === 'completed') {
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
            <form onSubmit={(e) => onSubmitEdit(e, id, label)} onKeyDown={(e) => onKeyDown(e, id)}>
              <input
                type="text"
                className="edit"
                autoFocus
                onChange={(e) => setText(e.target.value)}
                defaultValue={label}
              />
            </form>
          ) : null}
        </li>
      )
    })
  }

  return <ul className="todo-list">{elements()}</ul>
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
