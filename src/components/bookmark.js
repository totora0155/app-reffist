import React from 'react';
import ReffistStore from 'stores/reffist-store';

class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };
  }

  componentWillMount() {
    ReffistStore.getBookmark()
      .then((bookmarks) => {
        this.setState({bookmarks});
      });
  }

  render() {
    const lis = this.state.bookmarks.map((bookmark) => {
      return <li>{bookmark.title}</li>;
    });

    return (
      <form className="form__box">
        <h2 className="form__title">{this.props.title}</h2>
        <ul>{lis}</ul>
      </form>
    );
  }
}

export default Bookmark;
