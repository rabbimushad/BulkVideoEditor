import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentVideo, setPreset } from '../store/videoSlice';
import { Upload, Sliders, Save, Crop, Square, Droplet } from 'lucide-react';

const ManualEdit: React.FC = () => {
  const dispatch = useDispatch();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [editSettings, setEditSettings] = useState({
    trim: { start: 0, end: 0 },
    brightness: 0,
    contrast: 0,
    saturation: 0,
    aspectRatio: 'original',
    crop: { x: 0, y: 0, width: 100, height: 100 },
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      dispatch(setCurrentVideo(URL.createObjectURL(file)));
    }
  };

  const handleSettingChange = (setting: string, value: any) => {
    setEditSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleSavePreset = () => {
    dispatch(setPreset(editSettings));
    alert('Preset saved successfully!');
  };

  const applyAspectRatio = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const aspectRatio = editSettings.aspectRatio;
      let newWidth, newHeight;

      switch (aspectRatio) {
        case '16:9':
          newWidth = video.videoHeight * (16 / 9);
          newHeight = video.videoHeight;
          break;
        case '4:3':
          newWidth = video.videoHeight * (4 / 3);
          newHeight = video.videoHeight;
          break;
        case '1:1':
          newWidth = video.videoHeight;
          newHeight = video.videoHeight;
          break;
        default:
          newWidth = video.videoWidth;
          newHeight = video.videoHeight;
      }

      video.style.width = `${newWidth}px`;
      video.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      applyAspectRatio();
    }
  }, [editSettings.aspectRatio]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manual Video Edit</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="video-upload" className="block mb-2 font-semibold">
            Upload Video
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <Upload size={18} className="mr-2" />
              Choose Video
            </label>
            {videoFile && <span className="text-gray-600">{videoFile.name}</span>}
          </div>
        </div>
        {videoFile && (
          <>
            <video ref={videoRef} src={URL.createObjectURL(videoFile)} controls className="w-full mb-4" />
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Trim</label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Start (s)"
                    className="border rounded px-2 py-1 w-24"
                    onChange={(e) => handleSettingChange('trim', { ...editSettings.trim, start: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    placeholder="End (s)"
                    className="border rounded px-2 py-1 w-24"
                    onChange={(e) => handleSettingChange('trim', { ...editSettings.trim, end: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold">Brightness</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={editSettings.brightness}
                  onChange={(e) => handleSettingChange('brightness', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Contrast</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={editSettings.contrast}
                  onChange={(e) => handleSettingChange('contrast', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Saturation</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={editSettings.saturation}
                  onChange={(e) => handleSettingChange('saturation', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold flex items-center">
                  <Square size={18} className="mr-2" />
                  Aspect Ratio
                </label>
                <select
                  value={editSettings.aspectRatio}
                  onChange={(e) => handleSettingChange('aspectRatio', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="original">Original</option>
                  <option value="16:9">16:9</option>
                  <option value="4:3">4:3</option>
                  <option value="1:1">1:1</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold flex items-center">
                  <Crop size={18} className="mr-2" />
                  Crop
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="X"
                    value={editSettings.crop.x}
                    onChange={(e) => handleSettingChange('crop', { ...editSettings.crop, x: Number(e.target.value) })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    placeholder="Y"
                    value={editSettings.crop.y}
                    onChange={(e) => handleSettingChange('crop', { ...editSettings.crop, y: Number(e.target.value) })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    value={editSettings.crop.width}
                    onChange={(e) => handleSettingChange('crop', { ...editSettings.crop, width: Number(e.target.value) })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    value={editSettings.crop.height}
                    onChange={(e) => handleSettingChange('crop', { ...editSettings.crop, height: Number(e.target.value) })}
                    className="border rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSavePreset}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Preset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManualEdit;