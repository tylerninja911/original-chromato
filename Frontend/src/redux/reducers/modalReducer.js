const initialState = {
    showLoginModal:false,
    showSignUpModal:false
}

const modalReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case 'HIDE_ALL_MODALS':{
            return {showLoginModal:false, showSignUpModal:false}
        }

        case 'HIDE_LOGIN_MODAL':{
            return {...state, showLoginModal:false}
        }

        case 'SHOW_LOGIN_MODAL':{
            return {...state, showLoginModal:true , showSignUpModal:false}
        }

        case 'HIDE_SIGNUP_MODAL':{
            return {...state, showSignUpModal:false}
        }

        case 'SHOW_SIGNUP_MODAL':{
            return {...state, showSignUpModal:true, showLoginModal:false}
        }

        default:{
            return state
        }

    }

}

export default modalReducer;