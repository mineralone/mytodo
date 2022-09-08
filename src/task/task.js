import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onCompleted: () => {},
    onDeleted: () => {},
    onEditing: () => {},
    isCompleted: false,
    label: 'Empty task',
  };

  static propTypes = {
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onDeleted: PropTypes.func,
  };

  state = {
    dateCreate: new Date(),
    date: 'less than 5 seconds ago',
  };

  renderTime = () => {
    this.setState(({ dateCreate }) => {
      return {
        dateCreate: dateCreate,
        date: formatDistanceToNow(dateCreate, { includeSeconds: true, addSuffix: true }),
      };
    });
  };

  render() {
    setInterval(() => this.renderTime(), 5000);
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={this.props.onCompleted} checked={this.props.isCompleted} />
        <label>
          <span className="description"> {this.props.label} </span>
          <span className="created"> created {this.state.date} </span>
        </label>
        <button className="icon icon-edit" onClick={this.props.onEditing} />
        <button className="icon icon-destroy" onClick={this.props.onDeleted} />
      </div>
    );
  }
}
