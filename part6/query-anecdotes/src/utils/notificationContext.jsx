/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
        return action.payload
    case "REMOVE_ALERT":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const ContextProvider = ({children}) => {
	const [notification, dispatch] = useReducer(counterReducer, '')

	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext

export const useNotificationDispatch = () => {
	const [notification, dispatch] = useContext(NotificationContext)
	return dispatch
}

export const useNotificationMessage = () => {
	const [notification, dispatch] = useContext(NotificationContext)
	return notification
}