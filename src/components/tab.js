import React from 'react';

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="tab__box">
        <ul className="tab__list">
          <li className="tab__item"><a className="tab__btn tab__btn--active" role="button">Window</a></li>
          <li className="tab__item"><a className="tab__btn" role="button">Key Bind</a></li>
          <li className="tab__item"><a className="tab__btn" role="button">Bookmark</a></li>
          <li className="tab__item"><a className="tab__btn" role="button">History</a></li>
        </ul>
      </nav>
    )
  }
}

export default Tab;
