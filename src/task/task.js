import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    dateCreate: new Date(),
    date: 'less than 5 seconds ago',
  }

  renderTime = () => {
    this.setState(({ dateCreate }) => ({
      dateCreate,
      date: formatDistanceToNow(dateCreate, { includeSeconds: true, addSuffix: true }),
    }))
  }

  render() {
    const { onCompleted, isCompleted, label, id, onEditing, onDeleted } = this.props
    const { date } = this.state
    setInterval(() => this.renderTime(), 5000)
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onCompleted} checked={isCompleted} />
        <label htmlFor={id}>
          <span className="description">{`${label}`}</span>
          <span className="created">{`created ${date}`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditing} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    )
  }
}

Task.defaultProps = {
  onCompleted: () => {},
  onDeleted: () => {},
  onEditing: () => {},
  isCompleted: false,
  label: 'Empty task',
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  isCompleted: PropTypes.bool,
  label: PropTypes.string,
}
