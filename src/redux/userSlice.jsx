import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: localStorage.getItem('id') || '',
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
  token: localStorage.getItem('token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;

      localStorage.setItem('id', action.payload.id);
      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('token', action.payload.token);
    },
    clearUser(state) {
      state.id = '';
      state.name = '';
      state.email = '';
      state.token = '';

      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
