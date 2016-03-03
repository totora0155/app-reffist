import ConfigAction from 'actions/config-action';
import dispatcher from 'dispatcher';
import EventEmitter from 'events';

const ev = new EventEmitter();
const CHANGE = 'CHANGE';

let _tabName = 'window';

class ConfigStore {
  static emitChange() {
    ev.emit(CHANGE);
  }

  static addChangeListener(cb) {
    ev.on(CHANGE, cb);
  }

  static get currentTab() {
    return _tabName;
  }
}

dispatcher.register((payload) => {
  switch (payload.actionType) {
    case 'CHANGE_TAB':
      {
        const {tabName} = payload;
        _tabName = tabName;
        ConfigStore.emitChange();
      }
      break;
  }
});

export default ConfigStore;
