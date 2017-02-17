const socketServer = (socket) => {
  console.log('socket connected!')
  socket.on('yoServer', (data) => {
    console.log('Socket recieved new data ', data)
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
}

export default socketServer
