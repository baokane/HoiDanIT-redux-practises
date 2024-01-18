import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchBlog = createAsyncThunk(
  'users/fetchBlog',
  async (userId, thunkAPI) => {
    const response = await fetch('http://localhost:8000/blogs')
    const data = await response.json()
    return data
  }
)

interface IBlogPayload {
  title: string,
  author: string,
  content: string
}

export const createNewBlog = createAsyncThunk(
  'users/createNewBlog',
  async (payload: IBlogPayload, thunkAPI) => {

    let res = await fetch('http://localhost:8000/blogs', {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlog())
    }
    return data
  }
)

interface IBlogUpdatePayload {
  id: any,
  title: string,
  author: string,
  content: string
}

export const updateNewBlog = createAsyncThunk(
  'users/updateNewBlog',
  async (payload: IBlogUpdatePayload, thunkAPI) => {

    let res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...payload }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlog())
    }
    return data
  }
)

interface IBlogDelete {
  id: number
}

export const deleteBlog = createAsyncThunk(
  'users/deleteBlog',
  async (payload: IBlogDelete, thunkAPI) => {

    let res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ ...payload }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()

    thunkAPI.dispatch(fetchBlog())

    return data
  }
)

interface IBlog {
  id: number;
  title: string;
  author: string;
  content: string
}

// Define the initial state using that type
const initialState: {
  listBlog: IBlog[],
  isBlogCreateSuccess: boolean,
  isBlogUpdateSuccess: boolean,
  isBlogDeleteSucsess: boolean
} = {
  listBlog: [],
  isBlogCreateSuccess: false,
  isBlogUpdateSuccess: false,
  isBlogDeleteSucsess: false
}

// Then, handle actions in your reducers:
const blogSlide = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    resetBlogCreate: (state) => {
      state.isBlogCreateSuccess = false
    },
    resetBlogUpdate: (state) => {
      state.isBlogUpdateSuccess = false
    },
    resetBlogDelete: (state) => {
      state.isBlogDeleteSucsess = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchBlog.fulfilled, (state, action) => {
        // Add user to the state array
        state.listBlog = action.payload
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        // Add user to the state array
        state.isBlogCreateSuccess = true
      })
      .addCase(updateNewBlog.fulfilled, (state, action) => {
        // Add user to the state array
        state.isBlogUpdateSuccess = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        // Add user to the state array
        state.isBlogUpdateSuccess = true
      })
  },
})


export const { resetBlogCreate, resetBlogUpdate, resetBlogDelete } = blogSlide.actions

export default blogSlide.reducer