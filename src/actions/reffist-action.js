import socketIo from 'socket.io';
import dispatcher from 'dispatcher';
import actionType from 'constants/action-type';

class ReffistAction {
  static setAppMenu(menuTemplate) {
    dispatcher.dispatch({
      actionType: actionType.SET_APP_MENU,
      menuTemplate,
    });
  }

  static setTrayMenu(menuTemplate) {
    dispatcher.dispatch({
      actionType: actionType.SET_TRAY_MENU,
      menuTemplate,
    });
  }

  static connectSocket({port}) {
    dispatcher.dispatch({
      actionType: actionType.CONNECT_SOCKET,
      port,
    });
  }

  static createBW(data, assigner = {}) {
    dispatcher.dispatch({
      actionType: actionType.CREATE_BW,
      data,
      assigner,
    });
  }

  static changeDevice(item, targetWindow) {
    dispatcher.dispatch({
      actionType: actionType.CHANGE_DEVICE,
      item,
      targetWindow,
    })
  }

  static addBookmark(data) {
    dispatcher.dispatch({
      actionType: actionType.ADD_BOOKMARK,
      data,
    })
  }
}

export default ReffistAction;
