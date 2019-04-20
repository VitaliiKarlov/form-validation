import React, { Component } from 'react';
import inputs from '../inputs/inpust';
import Modal from '../Components/modal';
import Personal from '../Components/personal';
import FormSubmit from '../Components/formSubmit';
import Input from './input';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs,
      isCheck: true,
      allValid: [],
      modal: {
        isOpen: false,
        content: null,
        propClass: '',
        title: '',
      },
    };

    this.refApp = React.createRef();

    this.state.inputs.forEach(el => {
      this.state.allValid.push(false);
    });
  }

  addValue = (value, index, error) => {
    this.setState(prevState => {
      const newInputs = prevState.inputs.map((el, i) => {
        if (index === i) {
          el.value = value;
        }
        return el;
      });

      const newAllValid = prevState.allValid.map((el, i) => {
        if (index === i) {
          return error;
        } else {
          return el;
        }
      });

      return {
        inputs: newInputs,
        allValid: newAllValid,
      };
    });
  };

  onChange = () => {
    this.setState(prevState => {
      return {
        isCheck: !prevState.isCheck,
      };
    });
  };

  onOpenSubmit = () => {
    this.refApp.current.classList.add('blur');
    this.setState({
      modal: {
        isOpen: true,
        content: <FormSubmit />,
        propClass: 'dsa',
      },
    });
  };

  onOpenPerson = e => {
    this.refApp.current.classList.add('blur');
    e.preventDefault();
    this.setState({
      modal: {
        isOpen: true,
        content: <Personal />,
        propClass: 'asd',
        title: 'Персональные данные',
      },
    });
  };

  onClose = () => {
    this.refApp.current.classList.remove('blur');
    this.setState({
      modal: {
        isOpen: false,
        content: null,
        propClass: '',
        title: '',
      },
    });
  };

  render() {
    const { inputs, isCheck, allValid, modal } = this.state;
    let buttonDis;

    const arrInputs = inputs.map((el, i) => {
      return (
        <Input
          key={el.name}
          index={i}
          type={el.type}
          name={el.name}
          pattern={el.pattern}
          addValue={this.addValue}
        />
      );
    });

    const isDisabled = allValid.every(el => el);

    if (isCheck && isDisabled) {
      buttonDis = false;
    } else {
      buttonDis = true;
    }

    return (
      <div className="App" ref={this.refApp}>
        <div className="container">
          <form className="formBox">
            {arrInputs}
            <div className="inputBox">
              <input
                type="checkbox"
                id="person"
                checked={this.state.isCheck}
                onChange={this.onChange}
              />
              <label htmlFor="person" className="personalDoc">
                Я согласен на обработку моих
              </label>
              <a href="/#" onClick={this.onOpenPerson}>
                песональных данных
              </a>
            </div>
            <input
              type="button"
              value="Отправить"
              className="button"
              disabled={buttonDis}
              onClick={this.onOpenSubmit}
            />
          </form>
        </div>
        {this.state.modal.isOpen && (
          <Modal modal={modal} onClose={this.onClose} />
        )}
      </div>
    );
  }
}

export default App;
