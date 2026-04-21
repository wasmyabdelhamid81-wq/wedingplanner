import React, { useState } from 'react';
import { 
  Home, DollarSign, Users, CheckSquare, Clock, Building2, 
  Table2, Palette, UtensilsCrossed, Shirt, Camera, Gift
} from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'vendors', label: 'Vendors', icon: Building2 },
  { id: 'seating', label: 'Seating', icon: Table2 },
  { id: 'moodboard', label: 'Moodboard', icon: Palette },
  { id: 'catering', label: 'Catering', icon: UtensilsCrossed },
  { id: 'attire', label: 'Attire', icon: Shirt },
  { id: 'photography', label: 'Photos', icon: Camera },
  { id: 'gifts', label: 'Gifts', icon: Gift },
];

export function AppLayout({ activeTab, setActiveTab, children, lastSaved }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex bg-wedding-cream text-wedding-dark min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-[240px] bg-wedding-sage text-white flex-col hidden md:flex h-screen sticky top-0 p-[24px] no-print">
        <div className="font-serif text-[24px] font-bold mb-[40px] border-b border-white/20 pb-[12px]">
          Eternal.
        </div>
        <nav className="flex-1 overflow-y-auto space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-[14px] py-[10px] text-[13px] rounded-lg transition-all
                  ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 font-normal'}`}
              >
                <span className="w-[18px] mr-[12px] text-center shrink-0 flex justify-center">
                  <Icon className="w-4 h-4"/>
                </span>
                {tab.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[100vw] md:max-w-[calc(100vw-240px)] flex flex-col h-screen overflow-y-auto print:overflow-visible print:w-full print:max-w-full print:h-auto pb-20 md:pb-0 relative p-[24px]">
        <div className="flex-1 w-full relative z-0 flex flex-col h-full mx-auto">
           {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex flex-col no-print z-50">
        {mobileMenuOpen && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 bg-gray-50 border-b max-h-[40vh] overflow-y-auto shadow-inner">
             {TABS.slice(5).map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl ${isActive ? 'bg-wedding-sage/10 text-wedding-sage' : 'text-gray-600 hover:bg-gray-100'}`}>
                     <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-wedding-sage' : 'text-gray-400'}`}/>
                     <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                )
             })}
          </div>
        )}
        <nav className="flex justify-around p-2">
          {TABS.slice(0, 4).map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${isActive ? 'text-wedding-sage' : 'text-gray-500'}`}
              >
                <Icon className="w-6 h-6 mb-1"/>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${mobileMenuOpen ? 'text-wedding-sage' : 'text-gray-500'}`}
          >
            <div className="w-6 h-6 flex flex-col items-center justify-center gap-1 mb-1">
               <div className="w-4 h-0.5 bg-current rounded-full"></div>
               <div className="w-4 h-0.5 bg-current rounded-full"></div>
               <div className="w-4 h-0.5 bg-current rounded-full"></div>
            </div>
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
