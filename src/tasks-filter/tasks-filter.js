import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  filter = (e, status) => {
    const { onChangeRenderStatus } = this.props
    const allBtn = document.querySelectorAll('.selected')
    allBtn.forEach((item) => item.classList.remove('selected'))
    e.target.classList.add('selected')
    onChangeRenderStatus(status)
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className="selected" onClick={(e) => this.filter(e, 'all')}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={(e) => this.filter(e, 'active')}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={(e) => this.filter(e, 'complete')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.defaultProps = {
  onChangeRenderStatus: () => {},
}

TasksFilter.propTypes = {
  onChangeRenderStatus: PropTypes.func,
}
