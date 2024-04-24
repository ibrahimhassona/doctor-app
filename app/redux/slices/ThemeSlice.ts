import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "dark" | "light";
}
const initialState: ThemeState = {
  theme: "dark",
};
const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeToggle: (state, action: PayloadAction<any>) => {
      state.theme = action.payload;
    },
  },
});

export const { themeToggle } = ThemeSlice.actions;
export default ThemeSlice.reducer;
