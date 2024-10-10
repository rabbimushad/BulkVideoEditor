import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Layers, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Video Editor Pro</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="flex items-center">
                <Video className="mr-1" size={18} />
                Manual Edit
              </Link>
            </li>
            <li>
              <Link to="/batch" className="flex items-center">
                <Layers className="mr-1" size={18} />
                Batch Process
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-1" size={18} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;