import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer, { UserState, userSlice } from "./slices/user.slice"
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "./storage";
import chatReducer, { chatSlice } from "./slices/chats.slice";
import { ChatsState } from "./states/chats.states";
import appReducer, { AppState, appSlice } from "./slices/app.slice";

const rootPersistConfig: PersistConfig<{
    app: AppState,
    user: UserState,
    chats: ChatsState
}> = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [userSlice.name]: userReducer,
    [chatSlice.name]: chatReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

