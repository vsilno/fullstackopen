
export const setNotification = (message, dispatch) => {
	if (window.myTimeout) {
		clearTimeout(window.myTimeout)
	}

	dispatch({ type: 'SET_ALERT', payload: message  })
	
	setTimeout(() => {
		dispatch({ type: 'REMOVE_ALERT' })
	}, 5000)
}