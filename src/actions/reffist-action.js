import socketIo from 'socket.io';
import dispatcher from 'dispatcher';
import actionType from 'constants/action-type'

let _socket = null

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

  static addSocketListener({port}) {
    dispatcher.dispatch({
      actionType: actionType.ADD_SOCKET_LISTENER,
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
      actionType: sctionType.CHANGE_DEVICE,
      item,
      targetWindow,
    })
  }
}

export default ReffistAction;
