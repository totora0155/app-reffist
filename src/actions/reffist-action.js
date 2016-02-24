import socketIo from 'socket.io';
import dispatcher from 'dispatcher';
import actionTypeConstant from 'constants/action-type-constant'

let _socket = null

class ReffistAction {
  static connectSocket(port) {
    const io = socketIo.listen(53825);
    io.sockets.on('connection', (socket) => {
      _socket = socket;
      // socket.on('open', (sendData) => {
        // WindowAction.create(sendData);
      // });
    });
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
