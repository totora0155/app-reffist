import React from 'react';
import classNames from 'classnames';
import ConfigAction from 'actions/config-action';
import ConfigStore from 'stores/config-store';

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      tab: ConfigStore.currentTab,
    });
    console.log(this);
  }

  componentDidMount() {
    ConfigStore.addChangeListener(() => {
      this.setState({
        tab: ConfigStore.currentTab,
      });
    });
  }

  change(e) {
    ConfigAction.changeTab(e.target.dataset.value);
  }

  render() {
    return (
      <nav className="tab__box">
        <ul className="tab__list">
          <li className="tab__item">
            <a className={this.state.tab === 'window'
              ? 'tab__btn tab__btn--active'
              : 'tab__btn'} role="button"
              onClick={this.change} data-value="window">Window</a>
          </li>
          <li className="tab__item">
            <a className={this.state.tab === 'key-bind'
              ? 'tab__btn tab__btn--active'
              : 'tab__btn'} role="button"
              onClick={this.change} data-value="key-bind">Key Bind</a>
          </li>
          <li className="tab__item">
            <a className={this.state.tab === 'bookmark'
              ? 'tab__btn tab__btn--active'
              : 'tab__btn'} role="button"
              onClick={this.change} data-value="bookmark">Bookmark</a>
          </li>
          <li className="tab__item">
            <a className={this.state.tab === 'history'
              ? 'tab__btn tab__btn--active'
              : 'tab__btn'} role="button"
              onClick={this.change} data-value="history">History</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Tab;
