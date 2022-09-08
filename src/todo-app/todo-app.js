import React, { Component } from 'react';
import './todo-app.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer';

export default class TodoApp extends Component {
  countIds = 0;

  state = {
    todoData: [this.createTodo('Create first task')],
    renderStatus: 'all',
  };

  createTodo(text) {
    return {
      label: text,
      id: ++this.countIds,
      isEditing: false,
      isCompleted: false,
    };
  }

  addTodo = (text) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodo(text)],
      };
    });
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => item.id !== id),
      };
    });
  };

  onChangeStatus = (id, statusFlag) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          const newItem = { ...item };
          if (newItem.id === id) newItem[statusFlag] = !item[statusFlag];
          return newItem;
        }),
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => !item.isCompleted),
      };
    });
  };

  onChangeRenderStatus = (status) => {
    this.setState({
      renderStatus: status,
    });
  };

  onEditTodo = (id, label) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          const newItem = { ...item };
          if (newItem.id === id) {
            newItem.isEditing = false;
            newItem.label = label;
          }
          return newItem;
        }),
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTodo={this.addTodo} />
        </header>
        <section className="main">
          <TaskList
            onChangeStatus={this.onChangeStatus}
            todoData={this.state.todoData}
            onDeleted={this.onDeleted}
            renderStatus={this.state.renderStatus}
            onEditTodo={this.onEditTodo}
          />
          <Footer
            todoData={this.state.todoData}
            onChangeRenderStatus={this.onChangeRenderStatus}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
