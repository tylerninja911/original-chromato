const initialState  = {
    userName:null,
    userEmail:null
}

const loggedReducer = (state = initialState,{type, payload})=>{
    switch(type){
        case 'SIGN_IN':
            console.log(payload, 'payload')
            return {
                userName:payload.userName,
                userEmail:payload.userEmail,
                role:payload.role || 'member'
            }

        case 'SIGN_OUT':
            return {
                userName:null,
                userEmail:null
            } 
        
        case 'SIGN_UP':
            return {
                userName:payload.userName,
                userEmail:payload.userEmail,
                role:'member'

            }
        

        default:
            return state;
    }
}

export default loggedReducer;

