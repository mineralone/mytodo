import React, { Component } from 'react'
import './todo-app.css'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer'

export default class TodoApp extends Component {
  state = {
    countIds: 1,
    todoData: [],
    renderStatus: JSON.parse(localStorage.getItem('renderStatus')) || 'all',
  }

  componentDidMount() {
    const newCountIds = localStorage.getItem('countIds') ? Number(JSON.parse(localStorage.getItem('countIds'))) : 1
    const newRenderStatus = localStorage.getItem('renderStatus')
      ? JSON.parse(localStorage.getItem('renderStatus'))
      : 'all'
    const newTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : []
    this.setState({ countIds: newCountIds, renderStatus: newRenderStatus, todoData: newTodoData })
  }

  componentDidUpdate(prevProps, prevState) {
    const { countIds, renderStatus, todoData } = this.state
    if (prevState.countIds !== countIds) localStorage.setItem('countIds', JSON.stringify(countIds))
    if (prevState.renderStatus !== renderStatus) localStorage.setItem('renderStatus', JSON.stringify(renderStatus))
    if (prevState.todoData !== todoData) localStorage.setItem('todoData', JSON.stringify(todoData))
  }

  onEditTodo = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) {
          newItem.isEditing = false
          newItem.label = label
        }
        return newItem
      }),
    }))
  }

  addTodo = (text, min, sec) => {
    this.setState(({ todoData, countIds }) => ({
      todoData: [...todoData, this.createTodo(text, min, sec)],
      countIds: countIds + 1,
    }))
  }

  onDeleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => item.id !== id),
    }))
  }

  onChangeStatus = (id, statusFlag) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem[statusFlag] = !item[statusFlag]
        return newItem
      }),
    }))
  }

  onClearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.isCompleted),
    }))
  }

  onChangeRenderStatus = (status) => {
    this.setState({
      renderStatus: status,
    })
  }

  onToggleTimer = (id, timerFlag) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem.timer = timerFlag
        return newItem
      }),
    }))
  }

  timerFn = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        const newItem = { ...item }
        if (newItem.id === id) newItem.secTimer = item.secTimer - 1
        return newItem
      }),
    }))
  }

  createTodo(text, min, sec) {
    const { countIds } = this.state
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

  render() {
    const { todoData, renderStatus } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTodo={this.addTodo} />
        </header>
        <section className="main">
          <TaskList
            onChangeStatus={this.onChangeStatus}
            todoData={todoData}
            onDeleted={this.onDeleted}
            renderStatus={renderStatus}
            onEditTodo={this.onEditTodo}
            onToggleTimer={this.onToggleTimer}
            timerFn={this.timerFn}
          />
          <Footer
            doneCount={todoData.filter((item) => !item.isCompleted).length}
            onChangeRenderStatus={this.onChangeRenderStatus}
            onClearCompleted={this.onClearCompleted}
            renderStatus={renderStatus}
          />
        </section>
      </section>
    )
  }
}
