import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type LeaderboardEntry = {
  id: string;
  points: number;
  name: string;
  email: string;
  avatar: string;
};

type LeaderboardState = {
  users: LeaderboardEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: LeaderboardState = {
  users: [],
  status: "idle",
  error: null,
};

export const loadLeaderboard = createAsyncThunk<
  LeaderboardEntry[],
  void,
  { rejectValue: string }
>("leaderboard/loadLeaderboard", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/leaderboard");
    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue(result?.msg || "Unable to load leaderboard");
    }

    return (result.users ?? []) as LeaderboardEntry[];
  } catch {
    return rejectWithValue("Unable to load leaderboard");
  }
});

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLeaderboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadLeaderboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(loadLeaderboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load leaderboard";
      });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
