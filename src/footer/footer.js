import React from 'react'
import PropTypes from 'prop-types'
import './footer.css'

import TasksFilter from '../tasks-filter'

function Footer(props) {
  const { doneCount, onChangeRenderStatus, onClearCompleted, renderStatus } = props
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

export default Footer
