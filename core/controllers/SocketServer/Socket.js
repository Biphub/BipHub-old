import Single from '../../models/single'

// Action sent from bip to register itself
const ACTION_REGISTER_BIP = 'REGISTER_BIP'

const Socket = (socket) => {
  socket.on(ACTION_REGISTER_BIP, (data) => {
    console.log('Socket recieved new data ', data)
    const payload = {
      bip: { name: data.name },
      incomingActions: data.incomingActions,
    }
    // Add to DB
    Single.Bip.registerBip(payload).then((d) => {
      console.log('saved! ', d)
    })
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected ')
  })
}

export default Socket
