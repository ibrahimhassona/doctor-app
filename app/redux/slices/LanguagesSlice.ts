import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    language:'ar'
}

const LanguagesSlice = createSlice({
    name:'lang',
    initialState,
    reducers:{
        languageToggle:(state ,action : PayloadAction<string>)=>{
            state.language = action.payload
           
        },
    },
});

export const {languageToggle} = LanguagesSlice.actions;
export default LanguagesSlice.reducer;