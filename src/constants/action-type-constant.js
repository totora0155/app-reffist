import keyMirror from 'keymirror';

const actionTypeConstant = keyMirror({
  CREATE_BW: null,
  ADD_BOOKMARK: null,
  REMOVE_BOOKMARK: null,
  ADD_HISTORY: null,
  CHANGE_DEVICE: null,
  ADD_DEVICE: null,
  REMOVE_DEVICE: null,
  UPDATE_DEVICE: null,
});

export default actionTypeConstant;
