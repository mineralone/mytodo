import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  buttonAll = React.createRef()

  buttonCompleted = React.createRef()

  buttonActive = React.createRef()

  componentDidMount() {
    const { renderStatus } = this.props
    if (this.buttonActive.current.innerText.toString().toLowerCase() === renderStatus) {
      this.buttonActive.current.classList.add('selected')
    }
    if (this.buttonCompleted.current.innerText.toString().toLowerCase() === renderStatus) {
      this.buttonCompleted.current.classList.add('selected')
    }
    if (this.buttonAll.current.innerText.toString().toLowerCase() === renderStatus) {
      this.buttonAll.current.classList.add('selected')
    }
  }

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
          <button type="button" ref={this.buttonAll} onClick={(e) => this.filter(e, 'all')}>
            All
          </button>
        </li>
        <li>
          <button type="button" ref={this.buttonActive} onClick={(e) => this.filter(e, 'active')}>
            Active
          </button>
        </li>
        <li>
          <button type="button" ref={this.buttonCompleted} onClick={(e) => this.filter(e, 'completed')}>
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
