class StorageAction {
  static setHistory(data) {
    return storage.set('history', data);
  }

  static getHistory() {
    return storage.get('history');
  }

  constructor() {
  }
}
