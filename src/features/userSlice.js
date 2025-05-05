import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate 3-second delay for loading
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return [
    { id: 1, name: "Carla" },
    { id: 2, name: "Angelo" },
    { id: 3, name: "Juan" },
    { id: 4, name: "Lovely" },
    { id: 5, name: "Ana" },
    { id: 6, name: "Bea" },
    { id: 7, name: "Claire" },
    { id: 8, name: "Drake" },
    { id: 9, name: "Erica" },
    { id: 10, name: "Felicity" },
    { id: 11, name: "George" },
    { id: 12, name: "Hainna" },
    { id: 13, name: "Irish" },
    { id: 14, name: "Jamaica" },
    { id: 15, name: "Kaia" },
    { id: 16, name: "Lana" },
    { id: 17, name: "Maine" },
    { id: 18, name: "Niana" },
  ];
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    addUser: (state, action) => {
      state.users.unshift(action.payload); // Add to top of list
    },
    editUser: (state, action) => {
      const { id, newName } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user.name = newName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteUser, addUser, editUser } = userSlice.actions;
export default userSlice.reducer;
