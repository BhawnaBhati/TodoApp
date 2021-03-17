import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state) => {
  console.log(state);
  return state.user || initialState;
};

export const selectUser = selectDomain;

export const selectUsername = createSelector(
  [selectDomain],
  (UserState) => UserState.userData.username
);
