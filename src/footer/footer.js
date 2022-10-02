import React from 'react'
import PropTypes from 'prop-types'
import './footer.css'

import TasksFilter from '../tasks-filter'

export default function Footer({ doneCount, onChangeRenderStatus, onClearCompleted, renderStatus }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${doneCount} items left`}</span>
      <TasksFilter onChangeRenderStatus={onChangeRenderStatus} renderStatus={renderStatus} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  doneCount: 0,
  onChangeRenderStatus: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  doneCount: PropTypes.number,
  onChangeRenderStatus: PropTypes.func,
  onClearCompleted: PropTypes.func,
}
