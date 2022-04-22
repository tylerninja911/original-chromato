const itemReducer = (state = [], {type,payload})=>{
    
    switch(type){
        case 'PURGE':
            {
                return [];
            }


        case 'INCREASE_ITEM':
            {
                let amount = 1;
                let index = 0;

                for(let item of state){
                    if(item.name === payload.name){
                        amount = item.amount + 1;
                        break;
                    }
                    index+=1
                }
                // let items = state.filter(item=>item.name!== payload.name)
                let item = {...payload,amount};
                // const insert = (arr, index, newItem) => [
                //     ...items.slice(0, index),
                //     newItem,
                //     ...arr.slice(index)
                //   ]
                // return insert(items,index,item)

                // items[index] = item;
                // return items
                return [...state.slice(0, index), item, ...state.slice(index+1)]


            }
        case 'DECREASE_ITEM':
            {
                let amount = 0;
                let index = 0;
                for(let item of state){
                    if(item.name === payload.name){
                        amount = item.amount - 1;
                        break;
                    }
                    index+=1
                }
                let items = state.filter(item=>item.name!== payload.name)
                let item = {...payload,amount};

                if(amount>0){
                    const insert = (arr, index, newItem) => [
                        ...items.slice(0, index),
                        newItem,
                        ...arr.slice(index)
                      ]

                    return insert(items,index,item)
                }
                return items;

            }


        default:
            return state;
    }


}



export default itemReducer;
