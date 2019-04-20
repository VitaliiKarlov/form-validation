import React, { Component } from 'react';

import './input.css';

function debounce(func, ms) {
  let timer = null;
  return (...args) => {
    const later = () => {
      func(...args);
      timer = null;
    };
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(later, ms);
  };
}

export default class Input extends Component {
  state = {
    focus: false,
    error: false,
    success: false,
  };

  onFocus = () => {
    this.setState({
      focus: true,
    });
  };

  onBlur = e => {
    if (!e.target.value) {
      this.setState({
        focus: false,
      });
    }
  };

  checkValid = debounce(val => {
    const { pattern, index, addValue } = this.props;
    let valid = pattern.test(val);

    addValue(val, index, valid);

    this.setState({
      error: !valid,
      success: valid,
    });
  }, 200);

  render() {
    const { type, name } = this.props;
    const { focus, error, success } = this.state;
    let cls = 'inputBox';

    if (focus) cls += ' focus';
    if (error) cls += ' error';
    if (success) cls += ' success';

    return (
      <div className={cls}>
        <label className="labelText">{name}</label>
        <input
          type={type}
          className="userInput"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={e => this.checkValid(e.target.value)}
        />
      </div>
    );
  }
}
