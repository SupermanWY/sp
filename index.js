module.exports = {
	_handers: {},
	subscribe(eventName, hander, async) {
		if (!this._handers[eventName]) {
      this._handers[eventName] = {
        a: [],
        b: []
      }
    }
    var q = async ? 'a' : 'b',
        handerArr = this._handers[eventName][q]
    if (handerArr.indexOf(hander) < 0) {
      handerArr.push(hander)
    }
	},
  unsubscribe(eventName, hander) {
    var handerObj = this._handers[eventName]
    if (!handerObj) {
      return
    }
    var index = handerObj.a.indexOf(hander)
    index > -1 && handerObj.a.splice(index, 1)
    index = handerObj.b.indexOf(hander)
    index > -1 && handerObj.b.splice(index, 1)
  },
  publish(eventName, data) {
    var handerObj = this._handers[eventName]
    if (handerObj) {
      handerObj.a.map(hander => setTimeout(_ => hander(data), 0))
      handerObj.b.map(hander => hander(data))
    } else {
      throw new Error(eventName + '没有被订阅')
    }
  }
}