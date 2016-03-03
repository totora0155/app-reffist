import dispatcher from 'dispatcher';

class ConfigAction {
  static changeTab(tabName) {
    dispatcher.dispatch({
      actionType: 'CHANGE_TAB',
      tabName,
    });
  }
}

export default ConfigAction;
