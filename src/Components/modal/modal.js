import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.classList.add('modal');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const {
      modal: { content, propClass, title },
      onClose,
    } = this.props;

    console.log(propClass);

    let classes = `modal-container ${propClass}`;

    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay" onClick={onClose} />
        <div className={classes}>
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="modal-content">{content}</div>
          <div className="modal-footer">
            <button className="modal-button" onClick={onClose}>
              Выход
            </button>
          </div>
        </div>
      </>,
      this.el,
    );
  }
}

export default Modal;
