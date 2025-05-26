import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {cartProps} from "@/app/lib/definitions"

type CartState = { 
    items: cartProps[]
}

const initialState:CartState = {
    items: []
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

        updateQuantity: (state, action:PayloadAction<cartProps>) => {
            const item = state.items.find((item) => item.productId === action.payload.productId && item.size === action.payload.size)

            if (item) {
                item.quantity = action.payload.quantity
            }
        },

        removeFromCart : (state,action:PayloadAction<cartProps>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload.productId && item.size !== action.payload.size)
        },

        clearCart : (state) => {
            state.items = []
        },

    }
})

export default cartSlice.reducer;
export const {addToCart, updateQuantity, removeFromCart, clearCart} = cartSlice.actions
