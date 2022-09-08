import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-list.css';

import Task from '../task';

export default class TaskList extends Component {
  static defaultProps = {
    onEditTodo: () => {},
    onChangeStatus: () => {},
  };

  static propTypes = {
    onEditTodo: PropTypes.func,
    onChangeStatus: PropTypes.func,
    todoData: PropTypes.array.isRequired,
  };

  state = {
    label: '',
  };

  onEditTask = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmitEdit = (e, id, label) => {
    e.preventDefault();

    this.props.onEditTodo(id, this.state.label === '' ? label : this.state.label);
    this.setState({
      label: '',
    });
  };

  elements = (todoData, status) => {
    if (status === 'active') {
      todoData = todoData.filter((item) => !item.isCompleted);
    }
    if (status === 'complete') {
      todoData = todoData.filter((item) => item.isCompleted);
    }
    return todoData.map((item) => {
      const { label, id, isEditing, isCompleted } = item;
      return (
        <li key={id} className={isEditing ? 'editing' : isCompleted ? 'completed' : ''}>
          <Task
            label={label ? label : undefined}
            isCompleted={isCompleted}
            onDeleted={() => this.props.onDeleted(id)}
            onCompleted={() => this.props.onChangeStatus(id, 'isCompleted')}
            onEditing={() => this.props.onChangeStatus(id, 'isEditing')}
          />
          {isEditing ? (
            <form onSubmit={(e) => this.onSubmitEdit(e, id, label)}>
              <input type="text" className="edit" autoFocus onChange={this.onEditTask} defaultValue={label} />
            </form>
          ) : null}
        </li>
      );
    });
  };

  render() {
    const elements = this.elements(this.props.todoData, this.props.renderStatus);
    return <ul className="todo-list">{elements}</ul>;
  }
}
