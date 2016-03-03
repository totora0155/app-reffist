import React from 'react';
import Window from 'components/window';
import KeyBind from 'components/key-bind';
import Bookmark from 'components/bookmark';
import History from 'components/history';
import ReffistStore from 'stores/reffist-store';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      tab: ReffistStore.currentTab,
    });
  }

  componentDidMount() {
    ReffistStore.addChangeTabListener(() => {
      this.setState({
        tab: ReffistStore.currentTab,
      });
    });
  }

  render() {
    const activeEl = (() => {
      switch (this.state.tab.key) {
        case 'window':
          return <Window title={this.state.tab.name} />;
        case 'key-bind':
          return <KeyBind title={this.state.tab.name} />;
        case 'bookmark':
          return <Bookmark title={this.state.tab.name} />;
        case 'history':
          return <History title={this.state.tab.name} />;
        default:
          throw new Error('Unexpected tab name `' + this.state.tab.key + '`')
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
