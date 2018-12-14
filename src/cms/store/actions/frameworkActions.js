function makeAction (type, ...data) {
  if (type === 'GET_DATA') {
    return getData(data[0])
  }
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
function getData (server) {
  if (server) {
    this.$http.get('http://www.baidu.com', {}).then((response) => {
      console.log(response.data)
    }).catch((er) => {
      console.error(er)
    })
  }
}

// 获取数据
export const getFramwork = makeAction('GET_DATA', 'server')
