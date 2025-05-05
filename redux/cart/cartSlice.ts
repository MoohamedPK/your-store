import { createSlice } from "@reduxjs/toolkit";
import {cartProps} from "@/lib/definitions"

const initialState:cartProps = {
    items: {},
    productInfo: []
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
        }
    }
})

export default cartSlice.reducer;
export const {addToCart} = cartSlice.actions
