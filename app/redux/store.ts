import { configureStore } from "@reduxjs/toolkit";
import LanguagesSlice from "./slices/LanguagesSlice";
import ThemeSlice from "./slices/ThemeSlice";
import MenuSlice from "./slices/MenuSlice";

export const store = configureStore({
    reducer:{
        lang:LanguagesSlice,
        theme:ThemeSlice,
        menu:MenuSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;