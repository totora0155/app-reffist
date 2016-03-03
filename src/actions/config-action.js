import dispatcher from 'dispatcher';
import configActionType from 'constants/config-action-type';

class ConfigAction {
  static changeTab(tabName) {
    dispatcher.dispatch({
      actionType: configActionType.CHANGE_TAB,
      tabName,
    });
  }
}

export default ConfigAction;
