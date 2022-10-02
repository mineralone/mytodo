import React, { useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

export default function Task({
  date,
  timer,
  secTimer,
  timerFn,
  onCompleted,
  isCompleted,
  label,
  id,
  onEditing,
  onDeleted,
  onToggleTimer,
}) {
  const [dateFirst, setDate] = useState('')

  const renderTime = () => {
    const newDate = new Date(date)
    setDate(formatDistanceToNow(newDate, { includeSeconds: true, addSuffix: true }))
  }

  useEffect(() => {
    renderTime()
    const intervalDate = setInterval(renderTime, 5000)
    return () => clearInterval(intervalDate)
  }, [])

  useEffect(() => {
    const intervalTimer = setInterval(timerFn, 1000)
    if (!timer) clearInterval(intervalTimer)
    return () => clearInterval(intervalTimer)
  }, [timer])

  const formatTimer = () => {
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

  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={onCompleted} checked={isCompleted} />
      <label htmlFor={id}>
        <span className="title">{`${label}`}</span>
        <span className="description">
          <button type="button" className="icon icon-play" onClick={() => onToggleTimer(id, true)} />
          <button type="button" className="icon icon-pause" onClick={() => onToggleTimer(id, false)} />
          {formatTimer()}
        </span>
        <span className="description">{`created ${dateFirst}`}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onEditing} />
      <button type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  )
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
