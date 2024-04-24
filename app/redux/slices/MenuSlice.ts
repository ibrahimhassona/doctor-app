import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MenuState {
  isOpen: boolean;
}
const initialState: MenuState = { isOpen: false };
const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuToggle: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { menuToggle } = MenuSlice.actions;
export default MenuSlice.reducer;
