import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default function TasksFilter({ renderStatus, onChangeRenderStatus }) {
  const buttonAll = useRef()

  const buttonCompleted = useRef()

  const buttonActive = useRef()

  useEffect(() => {
    if (buttonActive.current.innerText.toString().toLowerCase() === renderStatus) {
      buttonActive.current.classList.add('selected')
    }
    if (buttonCompleted.current.innerText.toString().toLowerCase() === renderStatus) {
      buttonCompleted.current.classList.add('selected')
    }
    if (buttonAll.current.innerText.toString().toLowerCase() === renderStatus) {
      buttonAll.current.classList.add('selected')
    }
  }, [])

  const filter = (e, status) => {
    const allBtn = document.querySelectorAll('.selected')
    allBtn.forEach((item) => item.classList.remove('selected'))
    e.target.classList.add('selected')
    onChangeRenderStatus(status)
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" ref={buttonAll} onClick={(e) => filter(e, 'all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" ref={buttonActive} onClick={(e) => filter(e, 'active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" ref={buttonCompleted} onClick={(e) => filter(e, 'completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  onChangeRenderStatus: () => {},
}

TasksFilter.propTypes = {
  onChangeRenderStatus: PropTypes.func,
}
