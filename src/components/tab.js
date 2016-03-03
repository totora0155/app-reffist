import React from 'react';
import classNames from 'classnames';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';

class Tab extends React.Component {
  static get items() {
    return [
      {
        key: 'window',
        name: 'Window',
      },
      {
        key: 'key-bind',
        name: 'Key Bind',
      },
      {
        key: 'bookmark',
        name: 'Bookmark',
      },
      {
        key: 'history',
        name: 'History',
      },
    ];
  }

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

  change(e) {
    ReffistAction.changeTab(e.target.dataset.value);
  }

  render() {
    const lis = Tab.items.map((item) => {
      const btnClass = classNames({
        'tab__btn': true,
        'tab__btn--active': (item.key === this.state.tab.key),
      });

      return (
        <li key={item.key} className="tab__item">
          <a role="button" data-value={item.key} className={btnClass}
            onClick={this.change}
          >{item.name}</a>
        </li>
      );
    });

    return (
      <nav className="tab__box">
        <ul className="tab__list">{lis}</ul>
      </nav>
    );
  }
}

export default Tab;
