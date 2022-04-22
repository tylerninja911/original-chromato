const cartPreviewReducer = (state=false, {type, payload}) => {
    switch(type){
        case 'SHOW_CART_PREVIEW':{
            return true
        }

        case 'HIDE_CART_PREVIEW':{
            return false
        }

        default:{
            return state
        }
            
    }

}

export default cartPreviewReducer;