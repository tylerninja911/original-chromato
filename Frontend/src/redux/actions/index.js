import INCREASE_ITEM from '../action-types';
import DECREASE_ITEM from '../action-types';

export function increaseItem(payload){
    return {
        type:INCREASE_ITEM,
        payload
    }
}

export function decreaseItem(payload){
    return {
        type:DECREASE_ITEM,
        payload
    }
}

