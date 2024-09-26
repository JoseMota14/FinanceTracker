import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./tasks/TasksSlice";

const store = configureStore({
  reducer: {
    tasks: TaskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
