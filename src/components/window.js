import React from 'react';
import FormGroup from 'components/form-group';

const groups = {
  size: [
    {
      label: 'iPhone6Plus',
      type: 'radio',
      defaultValue: '',
      name: 'size',
    },
    {
      label: 'iPhone6',
      type: 'radio',
      defaultValue: '',
      name: 'size',
    },
  ],
  position: [
    {
      label: 'X',
      type: 'number',
      placeholder: 15,
    },
    {
      label: 'Y',
      type: 'number',
      placeholder: 15,
    },
  ],
};

// <li>
//   <a className="form__accent-btn" role="button">Add Size Preset</a>
// </li>

class Window extends React.Component {
  constructor(props) {
    super(props);
  }

  save() {
  }

  render() {
    return (
      <div className="form__wrapper">
        <form className="form__box" ref="form">
          <h2 className="form__title">{this.props.title}</h2>
          <FormGroup title="Size" inputs={groups.size} />
          <FormGroup title="Size" inputs={groups.position} />
          <div className="form__group">
            <div className="form__bundler">
              <a className="form__accent-btn" role="button"
                onClick={this.save.bind(this)}>Save</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Window
