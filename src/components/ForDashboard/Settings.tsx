import React from 'react';
import { useParams } from 'react-router-dom';

const Settings: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL

  return (
    <div>
      <h1>Settings for User: {userId}</h1>
      {/* Add your settings content here */}
    </div>
  );
};

export default Settings;
