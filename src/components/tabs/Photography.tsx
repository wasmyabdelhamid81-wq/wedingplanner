import React, { useState } from 'react';
import { WeddingData, MustHaveShot } from '../../types';
import { useToast } from '../ToastContext';
import { Camera, CheckSquare, Square, Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function Photography({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  const [newShotText, setNewShotText] = useState('');
  const [newShotCategory, setNewShotCategory] = useState('Getting Ready');
  
  const updateShot = (id: string, captured: boolean) => {
    const updated = data.photography.mustHaveShots.map(s => s.id === id ? { ...s, captured } : s);
    updateData('photography', { ...data.photography, mustHaveShots: updated });
  };

  const addShot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShotText.trim()) return;
    const newShot: MustHaveShot = {
      id: uuidv4(),
      category: newShotCategory,
      shot: newShotText.trim(),
      captured: false
    };
    updateData('photography', { ...data.photography, mustHaveShots: [...data.photography.mustHaveShots, newShot] });
    setNewShotText('');
    addToast('Shot added');
  };

  const deleteShot = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this shot from the list?')) {
      const updated = data.photography.mustHaveShots.filter(s => s.id !== id);
      updateData('photography', { ...data.photography, mustHaveShots: updated });
    }
  };

  const shotsByCategory = data.photography.mustHaveShots.reduce((acc, shot) => {
    if (!acc[shot.category]) acc[shot.category] = [];
    acc[shot.category].push(shot);
    return acc;
  }, {} as Record<string, typeof data.photography.mustHaveShots>);

  const total = data.photography.mustHaveShots.length;
  const captured = data.photography.mustHaveShots.filter(s => s.captured).length;

  return (
    <div className="space-y-6 fade-in print:m-0">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border-t-8 border-wedding-gold no-print">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-4 rounded-full"><Camera className="w-8 h-8 text-wedding-dark"/></div>
          <div>
            <h2 className="text-3xl font-bold font-serif">Photography Checklist</h2>
            <p className="text-gray-500">Capture every moment</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-wedding-sage">{captured} <span className="text-lg text-gray-400">/ {total}</span></div>
          <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Shots Captured</div>
        </div>
      </div>

      <form onSubmit={addShot} className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 items-end no-print">
         <div className="flex-1 w-full">
            <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">New Shot Detail</label>
            <input type="text" value={newShotText} onChange={e => setNewShotText(e.target.value)} placeholder="e.g. Ring detail on invitation suite" className="w-full bg-gray-50 rounded-lg px-4 py-2 border outline-none focus:border-wedding-sage" />
         </div>
         <div className="w-full md:w-64">
            <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Category</label>
            <select value={newShotCategory} onChange={e => setNewShotCategory(e.target.value)} className="w-full bg-gray-50 rounded-lg px-4 py-2 border outline-none focus:border-wedding-sage cursor-pointer">
               <option>Getting Ready</option>
               <option>Ceremony</option>
               <option>Portraits</option>
               <option>Reception</option>
               <option>Details</option>
            </select>
         </div>
         <button type="submit" disabled={!newShotText.trim()} className="bg-wedding-dark text-white font-medium px-6 py-2 rounded-lg hover:bg-black transition whitespace-nowrap h-[42px] disabled:opacity-50">
            Add Shot
         </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {Object.entries(shotsByCategory).map(([category, shots]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden break-inside-avoid print:shadow-none print:border print:mb-4">
             <div className="bg-gray-50 border-b p-3 font-bold font-serif text-lg flex justify-between items-center">
                {category}
                <span className="text-xs bg-white px-2 py-1 rounded text-gray-500 font-sans border">
                  {shots.filter(s => s.captured).length}/{shots.length}
                </span>
             </div>
             <div className="p-2">
                {shots.map(shot => (
                  <div key={shot.id} 
                    className={`flex items-start gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition group ${shot.captured ? 'opacity-50' : ''}`}
                    onClick={() => updateShot(shot.id, !shot.captured)}
                  >
                     <button className="mt-0.5 shrink-0 focus:outline-none">
                       {shot.captured ? <CheckSquare className="w-5 h-5 text-wedding-sage" /> : <Square className="w-5 h-5 text-gray-300" />}
                     </button>
                     <span className={`text-sm font-medium flex-1 ${shot.captured ? 'line-through text-gray-500' : 'text-wedding-dark'}`}>{shot.shot}</span>
                     <button onClick={(e) => deleteShot(e, shot.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition">
                       <Trash2 className="w-4 h-4"/>
                     </button>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
