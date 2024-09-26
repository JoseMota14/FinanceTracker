import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Task } from "../../entities/Task";

interface TasksState {
  selectedTask: Task["taskId"];
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TasksState = {
  selectedTask: {} as string,
  tasks: [],
  isError: false,
  isLoading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<Task["taskId"]>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { selectTask } = tasksSlice.actions;

export const selectIsLoading = (state: RootState) => state.tasks.isLoading;
export const obtainTasks = (state: RootState) => state.tasks.tasks;
export const obtainSelectedTask = (state: RootState) =>
  state.tasks.selectedTask;

export default tasksSlice.reducer;
