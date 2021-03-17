import { createSelector } from "@reduxjs/toolkit";

import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state) => state.task || initialState;

export const selectTask = selectDomain;

// export const selectFilteredTasks = createSelector(
//   [selectDomain],
//   (TaskState) => TaskState.filteredTasks
// );
