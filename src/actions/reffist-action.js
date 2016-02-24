import socketIo from 'socket.io';
import dispatcher from 'dispatcher';
import actionType from 'constants/action-type'

let _socket = null

class ReffistAction {
  static setAppMenu(menu) {
    const actionType = actionType.SET_APP_MENU;
    dispatcher.dispatch({actionType, menu});
  }

  static setTrayMenu(menu) {
    const actionType = actionType.SET_TRAY_MENU;
    dispatcher.dispatch({actionType, menu});
  }

  static addSocketListener({port}) {
    const actionType = actionType.ADD_SOCKET_LISTENER;
    dispatcher.dispatch({actionType, port});
  }

  static createBW(opts, url) {
    console.log(actionTypeConstant.CREATE_BW);
    console.log(opts, url);
    console.log(dispatcher.dispatch);
    dispatcher.dispatch({
      actionType: actionTypeConstant.CREATE_BW,
      opts,
      url,
    });
  }
}

export default ReffistAction;
