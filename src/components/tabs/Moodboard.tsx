import React from 'react';
import { WeddingData } from '../../types';
import { Palette, Droplet, X } from 'lucide-react';

export function Moodboard({ data, updateData }: { data: WeddingData, updateData: any }) {

  const updateMoodboard = (field: string, value: string) => {
    updateData('moodboard', { ...data.moodboard, [field]: value });
  };

  const updateSwatch = (index: number, color: string) => {
    const newSwatches = [...data.moodboard.colorSwatches];
    newSwatches[index] = color;
    updateData('moodboard', { ...data.moodboard, colorSwatches: newSwatches });
  };
  
  const removeSwatch = (index: number) => {
    if (data.moodboard.colorSwatches.length <= 1) return;
    const newSwatches = [...data.moodboard.colorSwatches];
    newSwatches.splice(index, 1);
    updateData('moodboard', { ...data.moodboard, colorSwatches: newSwatches });
  };

  return (
    <div className="space-y-6 fade-in bg-white p-6 rounded-xl shadow-sm print:shadow-none">
      <div className="flex border-b pb-4 mb-6 align-center gap-3">
        <Palette className="w-8 h-8 text-wedding-sage" />
        <h2 className="text-3xl font-bold font-serif">Wedding Moodboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div>
             <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Color Palette</label>
             <div className="flex flex-wrap gap-4">
               {data.moodboard.colorSwatches.map((color, index) => (
                 <div key={index} className="flex flex-col items-center gap-2 group relative pb-2 pt-2">
                   <button onClick={() => removeSwatch(index)} className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-0.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition z-20">
                      <X className="w-3 h-3" />
                   </button>
                   <div className="w-16 h-16 rounded-full shadow-md border-2 border-white relative overflow-hidden group/swatch">
                     <input type="color" value={color} onChange={(e) => updateSwatch(index, e.target.value)}
                        className="absolute inset-[-10px] w-24 h-24 cursor-pointer opacity-0 z-10" />
                     <div className="w-full h-full absolute inset-0" style={{ backgroundColor: color }}></div>
                   </div>
                   <span className="text-xs text-gray-500 font-mono uppercase">{color}</span>
                 </div>
               ))}
               <div className="pt-2">
                 <button onClick={() => updateData('moodboard', { ...data.moodboard, colorSwatches: [...data.moodboard.colorSwatches, '#CCCCCC'] })}
                   className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-wedding-sage hover:text-wedding-sage transition mt-0">
                    <Droplet className="w-6 h-6" />
                 </button>
               </div>
             </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Overall Theme & Vibe</label>
              <textarea 
                className="w-full border rounded-lg p-3 bg-gray-50 min-h-[100px] focus:ring-1 focus:ring-wedding-sage focus:outline-none"
                value={data.moodboard.inspirationNotes}
                onChange={(e) => updateMoodboard('inspirationNotes', e.target.value)}
                placeholder="Describe your vision..."
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Ceremony Details</label>
                <textarea className="w-full border-b bg-transparent p-2 focus:border-wedding-sage focus:outline-none" rows={3} value={data.moodboard.ceremonyVibe} onChange={e => updateMoodboard('ceremonyVibe', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Reception Details</label>
                <textarea className="w-full border-b bg-transparent p-2 focus:border-wedding-sage focus:outline-none" rows={3} value={data.moodboard.receptionVibe} onChange={e => updateMoodboard('receptionVibe', e.target.value)} />
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-wedding-cream p-6 rounded-xl h-full border border-wedding-blush flex flex-col justify-between">
              <h3 className="font-serif text-2xl text-center text-wedding-gold mb-8">{data.moodboard.theme || 'Wedding Theme'}</h3>
              
              <div className="grid grid-cols-2 gap-6 h-full">
                 <div className="space-y-6">
                   <div>
                     <div className="text-xs uppercase tracking-widest text-gray-500 mb-1 border-b border-wedding-sage pb-1">Flowers</div>
                     <input type="text" className="w-full bg-transparent font-medium mt-1 focus:outline-none placeholder-gray-300" placeholder="e.g. Peonies, Roses" value={data.moodboard.flowers} onChange={e => updateMoodboard('flowers', e.target.value)} />
                   </div>
                   <div>
                     <div className="text-xs uppercase tracking-widest text-gray-500 mb-1 border-b border-wedding-sage pb-1">Dress / Attire</div>
                     <input type="text" className="w-full bg-transparent font-medium mt-1 focus:outline-none placeholder-gray-300" placeholder="e.g. A-Line, Navy Suits" value={data.moodboard.dressStyle} onChange={e => updateMoodboard('dressStyle', e.target.value)} />
                   </div>
                 </div>
                 <div className="space-y-6">
                   <div>
                     <div className="text-xs uppercase tracking-widest text-gray-500 mb-1 border-b border-wedding-sage pb-1">Style</div>
                     <input type="text" className="w-full bg-transparent font-medium mt-1 focus:outline-none placeholder-gray-300" placeholder="e.g. Rustic, Modern" value={data.moodboard.style} onChange={e => updateMoodboard('style', e.target.value)} />
                   </div>
                   <div>
                     <div className="text-xs uppercase tracking-widest text-gray-500 mb-1 border-b border-wedding-sage pb-1">Music Vibe</div>
                     <input type="text" className="w-full bg-transparent font-medium mt-1 focus:outline-none placeholder-gray-300" placeholder="e.g. Jazz, Top 40" value={data.moodboard.musicGenre} onChange={e => updateMoodboard('musicGenre', e.target.value)} />
                   </div>
                 </div>
              </div>

              <div className="mt-8 flex gap-2 h-8 w-full rounded-full overflow-hidden shadow-sm">
                {data.moodboard.colorSwatches.map((color, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: color }}></div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
