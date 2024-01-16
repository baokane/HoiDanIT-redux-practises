import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
    'users/fetchListUsers',
    async (userId, thunkAPI) => {
        let res = await fetch('http://localhost:8000/users')
        const data = await res.json()
        return data
    }
)

interface IUserPayload {
    email: string,
    name: string
}
export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {

        let res = await fetch('http://localhost:8000/users', {
            method: 'POST',
            body: JSON.stringify({ ...payload }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUsers())
        }
        return data
    }
)

interface IUpdateUser {
    id: any,
    name: string,
    email: string
}

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: IUpdateUser, thunkAPI) => {

        let res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUsers())
        }
        return data
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload: any, thunkAPI) => {

        let res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()

        thunkAPI.dispatch(fetchListUsers())

        return data
    }
)

interface IUsers {
    id: number;
    name: string;
    email: string
}

const initialState: {
    listUsers: IUsers[],
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDeleteSuccess: boolean,
} = {
    listUsers: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false
        },
        resetDelete(state) {
            state.isDeleteSuccess = false
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.listUsers = action.payload
        })

            .addCase(createNewUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.isCreateSuccess = true
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.isUpdateSuccess = true
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.isDeleteSuccess = true
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlide.actions

export default userSlide.reducer