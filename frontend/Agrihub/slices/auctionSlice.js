import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AUCTION_api = "http://localhost:5000/api/auction"

// Async thunk to fetch auctions


export const fetchAuctions = createAsyncThunk('auctions/fetchAuctions', async (_, { rejectWithValue }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId')).userId;
      // Send userId as a query parameter
      const response = await axios.get(`${AUCTION_api}/farmer-auctions`, {
        params: { userId }, // Pass userId as a query parameter
      });

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch auctions');
    }
  });


  export const fetchAuctionBids = createAsyncThunk(
    'auctions/fetchAuctionBids',
    async (auctionId, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auction/${auctionId}/bids`
        );
        console.log('API Response:', response.data); // Debugging log
        return { auctionId, bids: response.data };
      } catch (error) {
        console.error('Fetch Bids Error:', error); // Debugging log
        return rejectWithValue(error.response?.data || 'Failed to fetch auction bids');
      }
    }
  );
  
  
  

// Async thunk to end an auction
export const endAuction = createAsyncThunk(
  "auctions/endAuction",
  async (auctionId, { rejectWithValue }) => {
    const userId = JSON.parse(localStorage.getItem("userId")).userId;
    try {
      const response = await axios.post(`${AUCTION_api}/${auctionId}/end`, { farmerId: userId });
      return { auctionId, winner: response.data.winner };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "An unknown error occurred" });
    }
  }
);

const auctionSlice = createSlice({
  name: 'auctions',
  initialState: {
    auctions: [],
    loading: false,
    error: null,
    auctionBids: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch auctions
      .addCase(fetchAuctions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(fetchAuctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // End auction
      .addCase(endAuction.fulfilled, (state, action) => {
        const { auctionId, winner } = action.payload;
        const auction = state.auctions.find((auction) => auction.id === auctionId);
        if (auction) {
          auction.status = 'ended';
          auction.winner = winner;
        }
      })
      .addCase(endAuction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAuctionBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctionBids.fulfilled, (state, action) => {
        state.loading = false;
      
        const { auctionId, bids } = action.payload;
      
        // Update auctionBids state
        state.auctionBids = {
          ...state.auctionBids,
          [auctionId]: bids,
        };
      
        console.log('Fulfilled Action:', action.payload);
      })
      
      .addCase(fetchAuctionBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const auctionReducer = auctionSlice.reducer

// export default auctionSlice.reducer;
