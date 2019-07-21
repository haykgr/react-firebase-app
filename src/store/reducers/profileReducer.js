const initState = {
    editError: null,
    contentEdited: false
}

const profileReducer = (state = initState, action) => {
    switch(action.type) {
        case 'PROFILE_EDIT_SUCCESS':
            console.warn('profile updated!');
            return {
                ...state,
                editError: null,
                contentEdited: true
            }
        case 'PROFILE_EDIT_ERROR':
            return {
                ...state,
                editError: 'edit failed',
                contentEdited: false
            }
        default:
            return state;
    }
}

export default profileReducer;