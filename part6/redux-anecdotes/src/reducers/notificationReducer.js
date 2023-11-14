import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage: (state, action) => action.payload,
		removeMessage: () => ''
    }
})
        
export default notificationSlice.reducer
export const { setMessage, removeMessage } = notificationSlice.actions

export const createAlert = (message, time) => {
    return dispatch => {
        if (window.myTimeout) {
            clearTimeout(window.myTimeout)
        }
        dispatch(setMessage(message))
        window.myTimeout = 
        setTimeout(() => {
            dispatch(removeMessage())
        }, time * 1000)
    }
}