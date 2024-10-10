import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setInputFolder, setOutputFolder, setProcessingStatus } from '../store/videoSlice';
import { FolderOpen, Play } from 'lucide-react';

// Create a mock ipcRenderer for browser environment
const ipcRenderer = {
  invoke: async (channel: string, ...args: any[]) => {
    console.log(`Mock ipcRenderer.invoke called with channel: ${channel}`, args);
    if (channel === 'select-folder') {
      return '/mock/folder/path';
    }
    if (channel === 'process-videos') {
      return { success: true, processedVideos: 5 };
    }
    return null;
  }
};

const BatchProcess: React.FC = () => {
  const dispatch = useDispatch();
  const { inputFolder, outputFolder, preset, processingStatus } = useSelector((state: RootState) => state.video);
  const [progress, setProgress] = useState(0);

  const handleSelectFolder = async (type: 'input' | 'output') => {
    const folder = await ipcRenderer.invoke('select-folder', type);
    if (folder) {
      if (type === 'input') {
        dispatch(setInputFolder(folder));
      } else {
        dispatch(setOutputFolder(folder));
      }
    }
  };

  const handleStartProcessing = async () => {
    if (!inputFolder || !outputFolder) {
      alert('Please select both input and output folders.');
      return;
    }

    dispatch(setProcessingStatus('processing'));
    setProgress(0);

    try {
      const result = await ipcRenderer.invoke('process-videos', inputFolder, outputFolder, preset);
      if (result.success) {
        dispatch(setProcessingStatus('completed'));
        setProgress(100);
        alert(`Successfully processed ${result.processedVideos} videos!`);
      } else {
        throw new Error('Processing failed');
      }
    } catch (error) {
      console.error('Error processing videos:', error);
      dispatch(setProcessingStatus('error'));
      alert('An error occurred while processing videos. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Batch Video Processing</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Input Folder</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSelectFolder('input')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <FolderOpen size={18} className="mr-2" />
                Select Input Folder
              </button>
              {inputFolder && <span className="text-gray-600">{inputFolder}</span>}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Output Folder</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSelectFolder('output')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <FolderOpen size={18} className="mr-2" />
                Select Output Folder
              </button>
              {outputFolder && <span className="text-gray-600">{outputFolder}</span>}
            </div>
          </div>
        </div>
        <button
          onClick={handleStartProcessing}
          disabled={processingStatus === 'processing' || !inputFolder || !outputFolder}
          className={`mt-6 px-4 py-2 rounded-md flex items-center ${
            processingStatus === 'processing' || !inputFolder || !outputFolder
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300`}
        >
          <Play size={18} className="mr-2" />
          Start Processing
        </button>
        {processingStatus === 'processing' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2">Processing... {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchProcess;