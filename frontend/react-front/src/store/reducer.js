// reducers.js
const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'REDUCE_MONEY':
            return {
                ...state,
                user: {
                    ...state.user,
                    money: state.user.money - action.payload,
                },
            };
        case 'REMOVE_USER':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;
