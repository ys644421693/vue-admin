const ws = new WebSocket('ws://localhost:8011/system/ws')

export const getWebSocket = function () {
  console.log('getWebSocket')
  if (ws) {
    return ws
  }
  return new WebSocket('ws://localhost:8011/system/ws')
}
