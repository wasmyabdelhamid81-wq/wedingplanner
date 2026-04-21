import React from 'react';
import { WeddingData, MenuItem } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../ToastContext';
import { Utensils, Plus, Trash2 } from 'lucide-react';

export function Catering({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();

  const courses = ['Cocktail Hour', 'Starter', 'Main', 'Dessert', 'Late Night', 'Drinks'];

  // Summarize dietary tags from guests
  const mealSummary = data.guests
    .filter(g => g.rsvp === 'attending' && g.meal)
    .reduce((acc, g) => {
      acc[g.meal] = (acc[g.meal] || 0) + g.partySize;
      return acc;
    }, {} as Record<string, number>);

  const addMenuItem = (course: string) => {
    const newItem: MenuItem = {
      id: uuidv4(),
      course,
      name: 'New Item',
      dietaryTags: [],
      notes: ''
    };
    updateData('catering', { ...data.catering, menuItems: [...data.catering.menuItems, newItem] });
  };

  const updateItem = (id: string, field: keyof MenuItem, value: any) => {
    const updated = data.catering.menuItems.map(m => m.id === id ? { ...m, [field]: value } : m);
    updateData('catering', { ...data.catering, menuItems: updated });
  };

  const removeMenuItem = (id: string) => {
    updateData('catering', { ...data.catering, menuItems: data.catering.menuItems.filter(m => m.id !== id) });
  };

  return (
    <div className="space-y-8 fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
         <div className="flex items-center gap-4">
           <div className="bg-wedding-blush p-4 rounded-full"><Utensils className="w-8 h-8 text-white"/></div>
           <div>
             <h2 className="text-3xl font-bold font-serif">Menu & Catering</h2>
             <p className="text-gray-500">Plan your dining experience</p>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 space-y-6">
           {courses.map(course => {
             const items = data.catering.menuItems.filter(m => m.course === course);
             if (items.length === 0 && course !== 'Main') return null; // Show empty sections if main, otherwise hide until added? Actually just show all sections.
             
             return (
               <div key={course} className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between items-center border-b pb-2 mb-4">
                   <h3 className="font-serif text-xl font-bold text-wedding-gold">{course}</h3>
                   <button onClick={() => addMenuItem(course)} className="text-wedding-sage hover:bg-wedding-sage hover:text-white rounded-full p-1 transition"><Plus className="w-5 h-5"/></button>
                 </div>
                 
                 <div className="space-y-4">
                   {items.map(item => (
                     <div key={item.id} className="flex gap-4 group">
                        <div className="flex-1">
                          <input type="text" value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)} className="font-bold text-lg w-full focus:outline-none focus:border-b border-wedding-sage bg-transparent" />
                          <input type="text" value={item.notes} onChange={e => updateItem(item.id, 'notes', e.target.value)} placeholder="Description or notes" className="text-sm text-gray-500 italic w-full focus:outline-none focus:border-b border-gray-300 bg-transparent mt-1" />
                        </div>
                        <div className="w-48 shrink-0">
                          <input type="text" value={item.dietaryTags.join(', ')} onChange={e => updateItem(item.id, 'dietaryTags', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="Tags (e.g. GF, V)" className="text-xs uppercase bg-gray-50 rounded px-2 py-1 w-full border focus:outline-none focus:border-wedding-sage" />
                        </div>
                        <button onClick={() => removeMenuItem(item.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition self-start p-1 mt-1"><Trash2 className="w-4 h-4"/></button>
                     </div>
                   ))}
                   {items.length === 0 && <p className="text-sm text-gray-400 italic">No items added to {course}.</p>}
                 </div>
               </div>
             )
           })}
         </div>

         <div className="space-y-6">
            <div className="bg-wedding-cream border border-wedding-sage p-6 rounded-xl shadow-sm">
               <h3 className="font-bold font-serif text-lg mb-4 text-center border-b border-wedding-sage pb-2">Guest Meal Counts</h3>
               {Object.keys(mealSummary).length === 0 ? (
                 <p className="text-sm text-gray-500 text-center italic py-4">No meals selected by guests yet.</p>
               ) : (
                 <ul className="space-y-2">
                   {Object.entries(mealSummary).sort((a,b) => b[1] - a[1]).map(([meal, count]) => (
                     <li key={meal} className="flex justify-between items-center font-medium">
                       <span>{meal}</span>
                       <span className="bg-white px-2 py-1 rounded shadow-sm text-wedding-sage">{count}</span>
                     </li>
                   ))}
                   <li className="pt-4 mt-4 border-t border-wedding-sage/30 flex justify-between font-bold">
                     <span>Total Meals</span>
                     <span>{Object.values(mealSummary).reduce((a,b)=>a+b, 0)}</span>
                   </li>
                 </ul>
               )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
               <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2">Catering Notes</h3>
               <textarea 
                  className="w-full h-32 p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-wedding-sage text-sm"
                  placeholder="Notes for caterer (e.g. vendor meals, set up times)"
                  value={data.catering.notes}
                  onChange={e => updateData('catering', { ...data.catering, notes: e.target.value })}
               ></textarea>
            </div>
         </div>
      </div>
    </div>
  );
}
