import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  currentVideo: string | null;
  preset: any;
  inputFolder: string | null;
  outputFolder: string | null;
  processingStatus: 'idle' | 'processing' | 'completed' | 'error';
}

const initialState: VideoState = {
  currentVideo: null,
  preset: {},
  inputFolder: null,
  outputFolder: null,
  processingStatus: 'idle',
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<string>) => {
      state.currentVideo = action.payload;
    },
    setPreset: (state, action: PayloadAction<any>) => {
      state.preset = action.payload;
    },
    setInputFolder: (state, action: PayloadAction<string>) => {
      state.inputFolder = action.payload;
    },
    setOutputFolder: (state, action: PayloadAction<string>) => {
      state.outputFolder = action.payload;
    },
    setProcessingStatus: (state, action: PayloadAction<'idle' | 'processing' | 'completed' | 'error'>) => {
      state.processingStatus = action.payload;
    },
  },
});

export const {
  setCurrentVideo,
  setPreset,
  setInputFolder,
  setOutputFolder,
  setProcessingStatus,
} = videoSlice.actions;

export default videoSlice.reducer;