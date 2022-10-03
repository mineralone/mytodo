import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    dateFirst: '5 seconds ago',
  }

  componentDidMount() {
    const { date } = this.props
    const newDate = new Date(date)
    this.setState({ dateFirst: formatDistanceToNow(newDate, { includeSeconds: false, addSuffix: true }) })
    this.intervalDate = setInterval(this.renderTime, 5000)
  }

  componentDidUpdate() {
    const { timer, timerFn } = this.props
    clearInterval(this.intervalTimer)
    this.intervalTimer = setInterval(timerFn, 1000)
    if (!timer) clearInterval(this.intervalTimer)
  }

  componentWillUnmount() {
    clearInterval(this.intervalDate)
    clearInterval(this.intervalTimer)
  }

  renderTime = () => {
    const { date } = this.props
    const newDate = new Date(date)
    this.setState({
      dateFirst: formatDistanceToNow(newDate, { includeSeconds: false, addSuffix: true }),
    })
  }

  formatTimer = () => {
    const { secTimer } = this.props
    if (Number(secTimer) > 0) {
      let min = Math.floor(Number(secTimer) / 60)
      let sec = Number(secTimer) - min * 60
      min = Number(min) < 10 ? `0${min}` : min
      sec = Number(sec) < 10 ? `0${sec}` : sec
      const result = Number(min) === 0 && Number(sec) === 0 ? 'The end' : `${min}:${sec}`
      return result
    }
    return 'The end'
  }

  render() {
    const { onCompleted, isCompleted, label, id, onEditing, onDeleted, onToggleTimer } = this.props
    const { dateFirst } = this.state
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onCompleted} checked={isCompleted} />
        <label htmlFor={id}>
          <span className="title">{`${label}`}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={() => onToggleTimer(id, true)} />
            <button type="button" className="icon icon-pause" onClick={() => onToggleTimer(id, false)} />
            {this.formatTimer()}
          </span>
          <span className="description">{`created ${dateFirst}`}</span>
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
