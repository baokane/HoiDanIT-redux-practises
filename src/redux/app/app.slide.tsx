import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState: {
    mode: string
} = {
    mode: 'light'
}

export const appSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeMode(state, action) {
            // state.isCreateSuccess = false
            state.mode = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeMode } = appSlide.actions

export default appSlide.reducer