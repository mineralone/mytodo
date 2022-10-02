import React, { useEffect, useState } from 'react'
import './todo-app.css'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer'

export default function TodoApp() {
  const [countIds, setCountIds] = useState(Number(JSON.parse(localStorage.getItem('countIds'))) || 1)
  const [renderStatus, setRenderStatus] = useState(JSON.parse(localStorage.getItem('renderStatus')) || 'all')
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem('todoData')) || [])

  useEffect(() => localStorage.setItem('countIds', JSON.stringify(countIds)), [countIds])
  useEffect(() => localStorage.setItem('renderStatus', JSON.stringify(renderStatus)), [renderStatus])
  useEffect(() => localStorage.setItem('todoData', JSON.stringify(todoData)), [todoData])

  const onEditTodo = (id, label) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) {
          newItem.isEditing = false
          newItem.label = label
        }
        return newItem
      })
    })
  }

  const createTodo = (text, min, sec) => {
    const newData = new Date()
    return {
      label: text,
      id: countIds,
      isEditing: false,
      isCompleted: false,
      secTimer: (Number(min) * 60 + Number(sec)).toString(),
      timer: false,
      date: newData,
    }
  }

  const addTodo = (text, min, sec) => {
    setTodoData((prevTodoData) => [...prevTodoData, createTodo(text, min, sec)])
    setCountIds((id) => id + 1)
  }

  const onChangeStatus = (id, statusFlag) => {
    setTodoData(() => {
      return todoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem[statusFlag] = !item[statusFlag]
        return newItem
      })
    })
  }

  const onToggleTimer = (id, timerFlag) => {
    setTodoData((todoArr) => {
      return todoArr.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem.timer = timerFlag
        return newItem
      })
    })
  }

  const timerFn = (id) => {
    setTodoData((todoArr) => {
      return todoArr.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem.secTimer = item.secTimer - 1
        return newItem
      })
    })
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTodo={addTodo} />
      </header>
      <section className="main">
        <TaskList
          onChangeStatus={onChangeStatus}
          todoData={todoData}
          onDeleted={(id) => setTodoData((todoArr) => todoArr.filter((item) => item.id !== id))}
          renderStatus={renderStatus}
          onEditTodo={onEditTodo}
          onToggleTimer={onToggleTimer}
          timerFn={timerFn}
        />
        <Footer
          doneCount={todoData.filter((item) => !item.isCompleted).length}
          onChangeRenderStatus={setRenderStatus}
          onClearCompleted={() => setTodoData((todoArr) => todoArr.filter((item) => !item.isCompleted))}
          renderStatus={renderStatus}
        />
      </section>
    </section>
  )
}
