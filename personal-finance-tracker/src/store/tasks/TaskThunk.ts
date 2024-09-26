import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../entities/Task";
import { getData } from "../../utils/Fetch";
import { notifyError, notifySuccess } from "../../utils/Notify";

export const fetchUsers = createAsyncThunk<Task[], void>(
  "users/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await getData("il_iamg/tasks");
      const users: Task[] = response.data.map((task: any) => ({}));

      notifySuccess("Fetch task with success");

      return users;
    } catch (err) {
      notifyError("Error while fetching task");

      return thunkAPI.rejectWithValue([]);
    }
  }
);
