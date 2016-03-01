let _intervalId = null;
let _height = null;

class ContextMenu {
  static autoScroll() {
    const scrollHeight = document.body.scrollHeight;
    _intervalId = setInterval(() => {
      if (_height < scrollHeight) {
        scrollTo(0, ++_height);
      } else {
        ContextMenu.cancelAutoScroll();
      }
    }, 8);
  }

    // be off the last pos
  static cancelAutoScroll() {
    if (_intervalId) {
      clearInterval(_intervalId);
      _intervalId = null;
      _height = null;
    }
  }
}

export default ContextMenu;
