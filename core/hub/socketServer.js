// Action sent from bip to register itself
const ACTION_REGISTER_BIP = 'REGISTER_BIP'

const socketServer = (socket) => {
  socket.on(ACTION_REGISTER_BIP, (data) => {
    console.log('Socket recieved new data ', data)
    console.log(socket)
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
}

export default socketServer
