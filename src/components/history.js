import React from 'react';
import ReffistStore from 'stores/reffist-store';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
    };
  }

  componentWillMount() {
    ReffistStore.getHistory()
      .then((histories) => {
        this.setState({histories});
      });
  }

  render() {
    const lis = this.state.histories.map((history) => {
      return <li>{history.title}</li>;
    });

    return (
      <form className="form__box">
        <h2 className="form__title">{this.props.title}</h2>
        <ul>{lis}</ul>
      </form>
    );
  }
}

export default History;
