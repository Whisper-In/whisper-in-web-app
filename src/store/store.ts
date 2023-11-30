import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer, { userSlice } from "./slices/user.slice"
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "./storage";
import appReducer, { AppState, appSlice } from "./slices/app.slice";
import { UserState } from "./states/user.states";
import { PersistPartial } from "redux-persist/es/persistReducer";

const appPersistConfig: PersistConfig<AppState> = {
    key: "app",
    storage,
    blacklist: ["currentPlayingAudio"]
}

const rootPersistConfig: PersistConfig<{
    app: AppState & PersistPartial,
    user: UserState
}> = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    [appSlice.name]: persistReducer(appPersistConfig, appReducer),
    [userSlice.name]: userReducer
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

