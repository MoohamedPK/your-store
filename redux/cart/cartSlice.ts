import { createSlice } from "@reduxjs/toolkit";
import {cartProps} from "@/lib/definitions"

const initialState:cartProps = {
    items: {},
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            const id = action.payload

            if (state.items[id]) {
                state.items[id]++
            } else {
                state.items[id] = 1
            }
        },

        descreaseCartItems : (state, action) => {
            const {quantity, id} = action.payload;

            if (quantity === 1 ) {
                delete state.items[id]
            } else {
                state.items[id]--
            }
        },

        deleteCartItem : (state,action) => {
            delete state.items[action.payload]
        }

    }
})

export default cartSlice.reducer;
export const {addToCart, descreaseCartItems, deleteCartItem} = cartSlice.actions
