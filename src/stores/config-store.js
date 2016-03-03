import EventEmitter from 'events';
import ConfigAction from 'actions/config-action';
import configActionType from 'constants/config-action-type';
import dispatcher from 'dispatcher';
import Tab from 'components/tab';

const ev = new EventEmitter();
const CHANGE = 'CHANGE';

let _currentTab = Tab.items[0].key;

class ConfigStore {
  static emitChange() {
    ev.emit(CHANGE);
  }

  static addChangeListener(cb) {
    ev.on(CHANGE, cb);
  }

  static get currentTab() {
    return _currentTab;
  }
}

dispatcher.register((payload) => {
  switch (payload.actionType) {
    case configActionType.CHANGE_TAB:
      {
        const {tabName} = payload;
        _currentTab = tabName;
        ConfigStore.emitChange();
      }
      break;
  }
});

export default ConfigStore;
