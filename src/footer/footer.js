import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './footer.css';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  static defaultProps = {
    todoData: [],
    onChangeRenderStatus: () => {},
    onClearCompleted: () => {},
  };

  static propTypes = {
    onChangeRenderStatus: PropTypes.func,
    onClearCompleted: PropTypes.func,
    todoData: PropTypes.array.isRequired,
  };

  render() {
    const doneCount = this.props.todoData.filter((item) => !item.isCompleted).length;
    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left </span>
        <TasksFilter onChangeRenderStatus={this.props.onChangeRenderStatus} />
        <button className="clear-completed" onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
