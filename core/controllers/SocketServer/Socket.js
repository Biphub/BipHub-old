import Q from 'q'
import Single from '../../models/single'

// Action sent from bip to register itself
const ACTION_REGISTER_BIP = 'REGISTER_BIP'

const Socket = (socket) => {
  socket.on(ACTION_REGISTER_BIP, (data) => {
    // console.log('Socket recieved new data ', data)
    const payload = {
      bip: { name: data.name },
      incomingActions: data.incomingActions,
      outgoingActions: data.outgoingActions,
    }
    // TODO: refactor this to use either Q or await
    Single.Bip.registerBip(payload).then((payload) => {
      Single.Bip.setBipActive(payload.id).then((payload) => {
        // console.log('updated ', payload)
      })
    })
  })


  socket.on('disconnect', () => {
    console.log('socket disconnected ')
  })
}

export default Socket
