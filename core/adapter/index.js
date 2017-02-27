import bipLoader from './BipLoader'

const initialize = (io) => {
  // Invokes init function of each bip
  bipLoader().initBips()

	/**
   * Emits action to all sockets
	 * Depreciated
	 * Moving this logic to controller
	 * @param action
	 * @param data
	 */
  const emit = (action, data) => {
    io.emit(action, data)
  }

  return {
    emit,
  }
}

export default {
  initialize,
}
