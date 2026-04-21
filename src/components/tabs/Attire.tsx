import React from 'react';
import { WeddingData, Attire as AttireType } from '../../types';
import { useToast } from '../ToastContext';
import { v4 as uuidv4 } from 'uuid';
import { Search, ShoppingBag, Ruler, CheckCircle, Check, Plus, Trash2 } from 'lucide-react';

export function Attire({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();

  const statuses = [
    { key: 'shopping', icon: Search, label: 'Shopping' },
    { key: 'ordered', icon: ShoppingBag, label: 'Ordered' },
    { key: 'fitting', icon: Ruler, label: 'Fitting' },
    { key: 'fitted', icon: CheckCircle, label: 'Fitted' },
    { key: 'ready', icon: Check, label: 'Ready' }
  ];

  const addAttire = () => {
    const newItem: AttireType = {
      id: uuidv4(),
      person: 'Name',
      role: 'Role',
      outfit: '',
      vendor: '',
      orderDate: '',
      fittingDates: [],
      pickupDate: '',
      notes: '',
      status: 'shopping'
    };
    updateData('attire', [...data.attire, newItem]);
  };

  const updateItem = (id: string, field: keyof AttireType, value: any) => {
    updateData('attire', data.attire.map(a => a.id === id ? { ...a, [field]: value } : a));
  };
  
  const removeItem = (id: string) => {
    updateData('attire', data.attire.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-serif">Wedding Attire</h2>
        <button onClick={addAttire} className="bg-wedding-dark text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-black transition">
          <Plus className="w-4 h-4" /> Add Outfit
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {data.attire.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
              <div className="flex gap-4 items-center w-full group/title">
                <input type="text" value={item.role} onChange={e => updateItem(item.id, 'role', e.target.value)} className="font-serif font-bold text-xl text-wedding-gold bg-transparent w-32 focus:outline-none focus:border-b border-wedding-gold" />
                <span className="text-gray-300">|</span>
                <input type="text" value={item.person} onChange={e => updateItem(item.id, 'person', e.target.value)} className="font-bold text-lg bg-transparent flex-1 focus:outline-none focus:border-b border-gray-300" placeholder="Person's Name" />
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover/title:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            
            <div className="p-4 bg-white border-b overflow-x-auto">
              {/* Stepper */}
              <div className="flex justify-between relative px-2 min-w-[350px]">
                 <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                 {statuses.map((s, idx) => {
                   const currIdx = statuses.findIndex(x => x.key === item.status);
                   const isPast = idx <= currIdx;
                   const Icon = s.icon;
                   return (
                     <div key={s.key} className="relative z-10 flex flex-col items-center gap-1 cursor-pointer" onClick={() => updateItem(item.id, 'status', s.key)}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPast ? 'bg-wedding-sage text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                           <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isPast ? 'text-wedding-sage' : 'text-gray-400'}`}>{s.label}</span>
                     </div>
                   );
                 })}
              </div>
            </div>

            <div className="p-5 grid grid-cols-2 gap-6 text-sm">
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Outfit Description</label>
                   <input type="text" value={item.outfit} onChange={e => updateItem(item.id, 'outfit', e.target.value)} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1 font-medium" placeholder="E.g. A-Line Lace Gown" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Store / Vendor</label>
                   <input type="text" value={item.vendor} onChange={e => updateItem(item.id, 'vendor', e.target.value)} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Order Date</label>
                   <input type="date" value={item.orderDate} onChange={e => updateItem(item.id, 'orderDate', e.target.value)} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1" />
                 </div>
               </div>
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Pickup / Ready Date</label>
                   <input type="date" value={item.pickupDate} onChange={e => updateItem(item.id, 'pickupDate', e.target.value)} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1 font-bold text-wedding-dark" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Fitting Dates (comma separated)</label>
                   <input type="text" value={item.fittingDates.join(', ')} onChange={e => updateItem(item.id, 'fittingDates', e.target.value.split(',').map(v=>v.trim()))} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1" placeholder="YYYY-MM-DD" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Notes</label>
                   <input type="text" value={item.notes} onChange={e => updateItem(item.id, 'notes', e.target.value)} className="w-full border-b focus:outline-none focus:border-wedding-sage bg-transparent pb-1 italic text-gray-500" />
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
