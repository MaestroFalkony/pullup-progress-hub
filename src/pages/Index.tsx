import React, { useState } from 'react';
import { DeviceConnection } from '@/components/DeviceConnection';
import { Dashboard } from '@/components/Dashboard';
import { WorkoutSession } from '@/components/WorkoutSession';
import { ProgressHistory } from '@/components/ProgressHistory';
import { SocialChallenges } from '@/components/SocialChallenges';
import { Navigation } from '@/components/Navigation';

type AppState = 'connection' | 'dashboard' | 'workout' | 'history' | 'challenges';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('connection');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    setAppState('dashboard');
  };

  const handleStartWorkout = () => {
    setAppState('workout');
  };

  const handleEndWorkout = () => {
    setAppState('dashboard');
  };

  const handleNavigate = (page: string) => {
    setAppState(page as AppState);
  };

  // Show connection screen if not connected
  if (!isConnected) {
    return <DeviceConnection onConnect={handleConnect} />;
  }

  return (
    <div className="min-h-screen pb-24">
      {appState === 'dashboard' && (
        <Dashboard onStartWorkout={handleStartWorkout} />
      )}
      {appState === 'workout' && (
        <WorkoutSession onEndWorkout={handleEndWorkout} />
      )}
      {appState === 'history' && (
        <ProgressHistory />
      )}
      {appState === 'challenges' && (
        <SocialChallenges />
      )}
      
      <Navigation currentPage={appState} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
