import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    onChangeRenderStatus: () => {},
  };

  static propTypes = {
    onChangeRenderStatus: PropTypes.func,
  };

  toggleClassSelected = (element) => {
    const allBtn = document.querySelectorAll('.selected');
    for (let btn of allBtn) {
      btn.classList.remove('selected');
    }
    element.classList.add('selected');
  };

  filter = (e, status) => {
    this.toggleClassSelected(e.target);
    this.props.onChangeRenderStatus(status);
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={(e) => this.filter(e, 'all')}>
            All
          </button>
        </li>
        <li>
          <button onClick={(e) => this.filter(e, 'active')}>Active</button>
        </li>
        <li>
          <button onClick={(e) => this.filter(e, 'complete')}>Completed</button>
        </li>
      </ul>
    );
  }
}
