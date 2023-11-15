// actions.js
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});


export const selectUser = (state) => state.user; // Assuming your user data is stored in 'user'
