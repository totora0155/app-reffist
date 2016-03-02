let _animationId = null;
let _height = null;

class ContextMenu {
  static autoScroll() {
    const scrollHeight = document.body.scrollHeight;
    _height = document.body.scrollTop;

    requestAnimationFrame(exec);
    function exec() {
      if (_height < scrollHeight) {
        scrollTo(0, ++_height);
        _animationId = requestAnimationFrame(exec);
      }
    }
  }

    // be off the last pos
  static cancelAutoScroll() {
    if (_animationId) {
      cancelAnimationFrame(_animationId);
      _animationId = null;
      _height = null;
    }
  }
}

export default ContextMenu;
