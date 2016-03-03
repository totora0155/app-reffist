import React from 'react';
import ConfigStore from 'stores/config-store';
import Tab from 'components/tab';
import Form from 'components/form';

class Config extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="config__box">
        <Tab />
        <Form />
      </main>
    )
  }
}

export default Config;
