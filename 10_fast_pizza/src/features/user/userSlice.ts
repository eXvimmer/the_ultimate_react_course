import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { iPosition } from "../../types";

// coords: {
// accuracy : 1
// altitude : null
// altitudeAccuracy : null
// heading : null
// latitude : 48.8582
// longitude : 2.3387
// speed : null
// }
// timestamp : 1695796155286
function getPosition() {
  return new Promise<{
    coords: iPosition;
    timestamp: number;
  }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's
    // address, so we can display it the order form, so that the user can correct
    // it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address }; // payload of the fulfilled stage
  },
);

interface State {
  username: string;
  status: "idle" | "loading" | "error";
  position?: iPosition;
  address?: string;
  error?: string;
}

const initialState: State = {
  username: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
