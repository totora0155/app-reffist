import React from 'react';
import Window from 'components/window';
import KeyBind from 'components/key-bind';
import Bookmark from 'components/bookmark';
import History from 'components/history';
import ConfigStore from 'stores/config-store';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      tab: ConfigStore.currentTab,
    });
  }

  componentDidMount() {
    ConfigStore.addChangeListener(() => {
      this.setState({
        tab: ConfigStore.currentTab,
      });
    });
  }

  render() {
    const activeEl = (() => {
      switch (this.state.tab) {
        case 'window':
          return <Window />;
        case 'key-bind':
          return <KeyBind />;
        case 'bookmark':
          return <Bookmark />;
        case 'history':
          return <History />;
        default:
          throw new Error('Unexpected tab name `' + this.state.tab + '`')
      }
    })();

    return (
      <div className="form__wrapper">
        {activeEl}
      </div>
    )
  }
}

export default Form;
