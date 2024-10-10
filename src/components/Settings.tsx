import React from 'react';
import { Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    outputFormat: 'mp4',
    resolution: '1080p',
    frameRate: 30,
  });

  const handleSettingChange = (setting: string, value: string | number) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a configuration file or database
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="outputFormat" className="block mb-2 font-semibold">
              Output Format
            </label>
            <select
              id="outputFormat"
              value={settings.outputFormat}
              onChange={(e) => handleSettingChange('outputFormat', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="mp4">MP4</option>
              <option value="avi">AVI</option>
              <option value="mov">MOV</option>
            </select>
          </div>
          <div>
            <label htmlFor="resolution" className="block mb-2 font-semibold">
              Resolution
            </label>
            <select
              id="resolution"
              value={settings.resolution}
              onChange={(e) => handleSettingChange('resolution', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4k">4K</option>
            </select>
          </div>
          <div>
            <label htmlFor="frameRate" className="block mb-2 font-semibold">
              Frame Rate
            </label>
            <input
              type="number"
              id="frameRate"
              value={settings.frameRate}
              onChange={(e) => handleSettingChange('frameRate', parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min="1"
              max="60"
            />
          </div>
        </div>
        <button
          onClick={handleSaveSettings}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;