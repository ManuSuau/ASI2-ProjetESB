// actions.js
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});


export const selectUser = (state) => state.user; // Assuming your user data is stored in 'user'


//reduce money action
export const reduceMoney = (amount) => ({
    type: 'REDUCE_MONEY',
    payload: amount,
});



//remove user
export const removeUser = () => ({
    type: 'REMOVE_USER',
    payload: null,
});