import React from 'react';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  change(e) {
  }

  render() {
    const lis = this.props.inputs.map((input) => {
      const {label, type, value, checked, name, placeholder} = input;

      switch (type) {
        case 'radio':
          return (
            <li className="form__item" key={label.toLowerCase()}>
              <label className="form__input-wrapper">
                <input className="form__radio--inline" type="radio"
                  name={name} checked={checked}
                  onChange={this.change.bind(this)} />
                <span>{label}</span>
              </label>
            </li>
          );

        case 'number':
          return (
            <li className="form__block" key={label.toLowerCase()}>
              <label htmlFor={label.toLowerCase()} className="form__label">
                {label}
              </label>
              <input className="form__input form__number" type="number"
                id={label.toLowerCase()} placeholder={placeholder}
                value={value} />
            </li>
          );
      }
    });

    return (
      <div className="form__group">
        <h3 className="form__group-title">{this.props.title}</h3>
        <div className="form__bundler">
          <ul className="form__list">{lis}</ul>
        </div>
      </div>
    );
  }
}

export default FormGroup;
