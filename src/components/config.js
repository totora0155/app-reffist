import React from 'react';

class Config extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="config__box">
        <nav className="tab__box">
          <ul className="tab__list">
            <li className="tab__item"><a className="tab__btn tab__btn--active" role="button">Window</a>
            </li><li className="tab__item"><a className="tab__btn" role="button">Key Bind</a>
            </li><li className="tab__item"><a className="tab__btn" role="button">Bookmark</a>
            </li><li className="tab__item"><a className="tab__btn" role="button">History</a>
            </li></ul>
        </nav>
        <div className="form__wrapper">
          <form className="form__box">
            <h2 className="form__title">Window</h2>
            <div className="form__group">
              <h3 className="form__group-title">Size</h3>
              <div className="form__bundler">
                <ul className="form__list">
                  <li className="form__item">
                    <label className="form__input-wrapper">
                      <input className="form__radio--inline" type="radio" defaultValue="iphone6Plus" name="size" />iPhone6Plus
                    </label>
                  </li>
                  <li>
                    <label className="form__input-wrapper">
                      <input className="form__radio--inline" type="radio" defaultValue="iphone6" name="size" />iPhone6
                    </label>
                  </li>
                  <li>
                    <a className="form__accent-btn" role="button">Add Size Preset</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="form__group">
              <h3 className="form__groupo-title">Position</h3>
              <div className="form__bundler">
                <div className="form__block">
                  <label htmlFor="x" className="form__label">X</label>
                  <input className="form__input form__number" type="number" id="x" placeholder={15} />
                </div>
                <div className="form__block">
                  <label htmlFor="y" className="form__label">Y</label>
                  <input className="form__input form__number" type="number" id="y" placeholder={15} />
                </div>
              </div>
            </div>
            <div className="form__group">
              <div className="form__bundler">
                <a className="form__accent-btn" role="button">Save</a>
              </div>
            </div>
          </form>
        </div>
      </main>
    )
  }
}

export default Config;
