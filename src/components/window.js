import React from 'react';
import ReffistStore from 'stores/reffist-store';
import FormGroup from 'components/form-group';

const groups = {
  size: [
    {
      label: 'iPhone6Plus',
      type: 'radio',
      checked: false,
      name: 'size',
    },
    {
      label: 'iPhone6',
      type: 'radio',
      checked: false,
      name: 'size',
    },
  ],
  position: [
    {
      label: 'X',
      type: 'number',
      value: '',
      placeholder: 15,
      name: 'x'
    },
    {
      label: 'Y',
      type: 'number',
      value: '',
      placeholder: 15,
      name: 'y'
    },
  ],
};

// TODO: ADD preset btn
// <li>
//   <a className="form__accent-btn" role="button">Add Size Preset</a>
// </li>

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {groups};
  }

  // componentWillMount() {
    // ReffistStore.getConfig().then(config => this.setState({config});
      // .then((config) => {
      //   this.setState(config)
      //   init.bind(this)
      // });
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(99);
  //   console.log(nextProps);
  // }

  save() {
  }

  ComponentWillMount() {
    ReffistStore.addChangeWindowListener(() => {
      ReffistStore.getConfig().then(init.bind(this));
    });
    ReffistStore.getConfig().then(init.bind(this));
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

function init(config) {
  groups.size.map((item) => {
    if (item.label === config.size) {
      item.checked = true;
    }
    return item;
  });

  groups.position.map((item) => {
    const key = item.label.toLowerCase()
    if (config.position[key] != null) {
      item.value = config.position[key];
    }
    return item;
  });

  this.setState({groups});
}
