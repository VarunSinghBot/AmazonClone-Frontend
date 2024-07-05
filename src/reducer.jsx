export const initialState = {
    basket: [],
    user: null,
    address: {}
}

const reducer = (state, action) => {
    console.log('action >>>>>', action)

    switch(action.type){

        case 'Add_To_Basket':
            // Check if user is logged in
            if (state.user) { 
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        } else {
            console.log('User not authenticated. Redirecting to login.');
            // Handle redirection or display a message
            return state; // Return current state if user is not authenticated
        }

        
        case 'Remove_From_Basket':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            if (index >= 0) {
                let newBasket = [...state.basket];
                newBasket.splice(index, 1);
                return {
                    ...state,
                    basket: newBasket
                };
            } else {
                console.warn(`Product with id ${action.id} not found in basket.`);
                return state; // Return state as is when item is not found
            }
        

        case 'Empty_Basket':
            return {
                ...state,
                basket: []
            }
        

        case 'Set_Address':
            
            return {
                ...state,
                address:{...action.item}
            }

        case 'Set_User':
            
            return {
                ...state,
                user: action.user
            };
            
        default:
            return state;
    }
}

export default reducer