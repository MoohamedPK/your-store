import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {cartProps} from "@/app/lib/definitions"

type CartState = { 
    items: cartProps[],
}

const initialState:CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<cartProps>) =>{
            const {productId, quantity, size} = action.payload;

            const itemExist = state.items.find((item) => item.productId === productId) 

            if (itemExist &&  itemExist.size === size) {
                itemExist.quantity += quantity
                
            } else if (itemExist &&  itemExist.size !== size) {
                itemExist.size = size
            } else {
                state.items.push(action.payload)
                
            }
            
        },

        updateQuantity: (state, action: PayloadAction<cartProps>) => {
            const itemIndex = state.items.findIndex(
                (item) =>
                item.productId === action.payload.productId &&
                item.size === action.payload.size
            );
            
            if (itemIndex >= 0 ) {
                const newQuantity = state.items[itemIndex].quantity + action.payload.quantity;
            
                if (newQuantity <= 0) {
                // Remove item if quantity is 0 or less
                state.items.splice(itemIndex, 1);
                } else {
                // Otherwise update the quantity
                state.items[itemIndex].quantity = newQuantity;
                }
            }
            },

        removeFromCart : (state,action:PayloadAction<cartProps>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload.productId || item.size !== action.payload.size)
        },

        clearCart : (state) => {
            state.items = []
        },

        setCart : (state, action:PayloadAction<cartProps[]>) => {
            state.items = action.payload
        }

    }
})

export default cartSlice.reducer;
export const {addToCart, updateQuantity, removeFromCart, clearCart, setCart} = cartSlice.actions
