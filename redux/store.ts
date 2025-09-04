import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/redux/cart/cartSlice"
import {persistStore, persistReducer ,FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
    key: "cart",
    storage,
    whitelist: ['items']
}

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartSlice),
})

const store = configureStore({
    
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE ],
            }
        })
})

const persistor = persistStore(store);
export {persistor,store}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch