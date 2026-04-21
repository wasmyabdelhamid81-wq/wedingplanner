import React, { useState } from 'react';
import { WeddingData } from '../../types';
import { useToast } from '../ToastContext';
import { v4 as uuidv4 } from 'uuid';
import { Users, UserPlus, FileDown, Trash2 } from 'lucide-react';

export function Guests({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined' | 'pending'>('all');

  const filteredGuests = data.guests.filter(g => filter === 'all' || g.rsvp === filter);

  const stats = {
    total: data.guests.length,
    attending: data.guests.filter(g => g.rsvp === 'attending').length,
    declined: data.guests.filter(g => g.rsvp === 'declined').length,
    pending: data.guests.filter(g => g.rsvp === 'pending').length,
  };

  const addGuest = () => {
    const newGuest = { id: uuidv4(), name: 'New Guest', rsvp: 'pending' as const, meal: '', table: null, partySize: 1 };
    updateData('guests', [...data.guests, newGuest]);
    addToast('Guest added');
  };

  const deleteGuest = (id: string) => {
    if (confirm('Are you sure you want to delete this guest?')) {
      updateData('guests', data.guests.filter(g => g.id !== id));
      addToast('Guest deleted');
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-3xl font-bold font-serif flex items-center gap-2"><Users className="w-8 h-8"/> Guest Management</h2>
        <div className="flex gap-2">
           <button onClick={addGuest} className="bg-wedding-sage text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-green-700 transition">
             <UserPlus className="w-4 h-4" /> Add Guest
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="bg-white p-4 rounded-xl shadow-sm text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => setFilter(k as any)}>
             <div className="text-2xl font-bold text-wedding-dark">{v}</div>
             <div className="text-sm uppercase tracking-widest text-gray-500">{k}</div>
             <div className={`mt-2 h-1 w-full rounded ${k === 'attending' ? 'bg-wedding-sage' : k==='pending' ? 'bg-wedding-gold' : k==='declined'?'bg-red-300':'bg-wedding-blush'}`}></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-600">RSVP Status</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-center">Party Size</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Meal Preference</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-center">Table</th>
                <th className="py-3 px-4 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map(guest => (
                <tr key={guest.id} className="border-b hover:bg-gray-50 transition group">
                  <td className="py-3 px-4 font-medium">
                     <input type="text" className="bg-transparent border-b border-transparent focus:border-gray-300 outline-none w-full" value={guest.name}
                      onChange={(e) => {
                        const newGuests = data.guests.map(g => g.id === guest.id ? { ...g, name: e.target.value } : g);
                        updateData('guests', newGuests);
                      }} />
                  </td>
                  <td className="py-3 px-4">
                    <select 
                       className={`rounded px-2 py-1 text-sm border font-medium focus:outline-none focus:ring-1 focus:ring-wedding-sage
                         ${guest.rsvp === 'attending' ? 'bg-green-100 text-green-800 border-green-200' : 
                           guest.rsvp === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                           'bg-red-100 text-red-800 border-red-200'}`}
                       value={guest.rsvp}
                       onChange={(e) => {
                         const newGuests = data.guests.map(g => g.id === guest.id ? { ...g, rsvp: e.target.value as any } : g);
                         updateData('guests', newGuests);
                         addToast(`${guest.name} RSVP updated`);
                       }}
                     >
                       <option value="attending">Attending</option>
                       <option value="pending">Pending</option>
                       <option value="declined">Declined</option>
                     </select>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input type="number" min="1" className="w-16 border rounded px-2 py-1 text-center" value={guest.partySize} 
                      onChange={(e) => {
                        const newGuests = data.guests.map(g => g.id === guest.id ? { ...g, partySize: Number(e.target.value) } : g);
                        updateData('guests', newGuests);
                      }}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input type="text" className="border rounded px-2 py-1 w-full" placeholder="e.g. Beef, Vegan" value={guest.meal}
                      onChange={(e) => {
                        const newGuests = data.guests.map(g => g.id === guest.id ? { ...g, meal: e.target.value } : g);
                        updateData('guests', newGuests);
                      }} />
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-400">
                     {guest.table || '-'}
                  </td>
                  <td className="py-3 px-4 text-center">
                     <button onClick={() => deleteGuest(guest.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500 italic">No guests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
