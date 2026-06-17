import React from 'react';

export const TabNavigation = ({ activeTab, setActiveTab, tabs }) => (
  <div className="flex justify-around border-b border-white/20 mb-8 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex-1 py-3 text-center text-sm sm:text-base font-semibold transition ${
          activeTab === tab.id
            ? 'text-white border-b-2 border-white bg-white/20'
            : 'text-white/70 hover:text-white'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);