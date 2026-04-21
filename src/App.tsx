import React, { useState } from 'react';
import { ToastProvider } from './components/ToastContext';
import { useWeddingData } from './hooks';
import { AppLayout } from './components/AppLayout';
import {
  Dashboard, Budget, Guests, Tasks, DayTimeline, 
  Vendors, Seating, Moodboard, Catering, Attire, 
  Photography, Gifts
} from './components';

export default function App() {
  const { data, updateData, lastSaved } = useWeddingData();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard data={data} updateData={updateData} />;
      case 'budget': return <Budget data={data} updateData={updateData} />;
      case 'guests': return <Guests data={data} updateData={updateData} />;
      case 'tasks': return <Tasks data={data} updateData={updateData} />;
      case 'timeline': return <DayTimeline data={data} updateData={updateData} />;
      case 'vendors': return <Vendors data={data} updateData={updateData} />;
      case 'seating': return <Seating data={data} updateData={updateData} />;
      case 'moodboard': return <Moodboard data={data} updateData={updateData} />;
      case 'catering': return <Catering data={data} updateData={updateData} />;
      case 'attire': return <Attire data={data} updateData={updateData} />;
      case 'photography': return <Photography data={data} updateData={updateData} />;
      case 'gifts': return <Gifts data={data} updateData={updateData} />;
      default: return <Dashboard data={data} updateData={updateData} />;
    }
  };

  return (
    <ToastProvider>
      <AppLayout activeTab={activeTab} setActiveTab={setActiveTab} lastSaved={lastSaved}>
        {renderTab()}
      </AppLayout>
    </ToastProvider>
  );
}
