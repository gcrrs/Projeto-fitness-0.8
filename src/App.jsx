import React from 'react';
import { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  // Como o localStorage não é suportado em artefatos Claude.ai,
  // vamos usar apenas estado em memória durante a sessão
  const handleProfileSubmit = (profileData) => {
    setUserProfile(profileData);
  };

  const handleResetProfile = () => {
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {userProfile ? (
        <Dashboard userProfile={userProfile} onReset={handleResetProfile} />
      ) : (
        <ProfileForm onSubmit={handleProfileSubmit} />
      )}
    </div>
  );
}

export default App;