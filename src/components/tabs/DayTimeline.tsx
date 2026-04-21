import React, { useState } from 'react';
import { WeddingData, ScheduleEvent } from '../../types';
import { useToast } from '../ToastContext';
import { v4 as uuidv4 } from 'uuid';
import { Clock, MapPin, User, Plus, Trash2 } from 'lucide-react';

export function DayTimeline({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  
  const sortedEvents = [...data.weddingDaySchedule].sort((a,b) => a.time.localeCompare(b.time));

  const addEvent = () => {
    const newEvent: ScheduleEvent = {
       id: uuidv4(),
       time: '12:00',
       event: 'New Event',
       location: '',
       assignedTo: '',
       notes: ''
    };
    updateData('weddingDaySchedule', [...data.weddingDaySchedule, newEvent]);
    addToast('Event added');
  };

  const updateEvent = (id: string, field: keyof ScheduleEvent, value: string) => {
    const updated = data.weddingDaySchedule.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateData('weddingDaySchedule', updated);
  };
  
  const removeEvent = (id: string) => {
    updateData('weddingDaySchedule', data.weddingDaySchedule.filter(e => e.id !== id));
    addToast('Event removed');
  };

  return (
    <div className="space-y-6 fade-in print-only:m-0">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-3xl font-bold font-serif">Wedding Day Timeline</h2>
        <button onClick={addEvent} className="bg-wedding-sage text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-green-700 transition">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>
      
      <div className="print-only hidden">
         <h1 className="text-4xl font-serif text-center mb-8 border-b-2 border-wedding-gold pb-4">Wedding Day Itinerary</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-2 md:p-8 relative">
         <div className="absolute left-8 md:left-12 top-10 bottom-10 w-0.5 bg-wedding-blush hidden sm:block"></div>
         <div className="space-y-8">
           {sortedEvents.map((event, index) => (
             <div key={event.id} className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-8 group">
               <div className="sm:w-24 shrink-0 font-bold text-xl text-wedding-gold text-left sm:text-right pt-2 flex items-center gap-2 sm:block bg-white relative z-10">
                 <input type="time" value={event.time} 
                   onChange={(e) => updateEvent(event.id, 'time', e.target.value)} 
                   className="w-full text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-wedding-sage" />
               </div>
               
               <div className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition relative">
                 <div className="absolute -left-[30px] top-4 w-4 h-4 rounded-full bg-wedding-sage border-4 border-white hidden sm:block"></div>
                 
                 <div className="flex justify-between items-start mb-2">
                   <input type="text" value={event.event} 
                     onChange={(e) => updateEvent(event.id, 'event', e.target.value)}
                     className="font-bold text-lg text-wedding-dark bg-transparent w-full focus:outline-none border-b border-transparent focus:border-wedding-sage transition" placeholder="Event Name" />
                   
                   <button onClick={() => removeEvent(event.id)} className="text-gray-300 hover:text-red-500 no-print px-2 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                 </div>
                 
                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                   <div className="flex items-center gap-1">
                     <MapPin className="w-4 h-4 text-wedding-sage" />
                     <input type="text" value={event.location} onChange={(e) => updateEvent(event.id, 'location', e.target.value)} className="bg-transparent focus:outline-none focus:border-b border-gray-300 w-32" placeholder="Location" />
                   </div>
                   <div className="flex items-center gap-1">
                     <User className="w-4 h-4 text-wedding-sage" />
                     <input type="text" value={event.assignedTo} onChange={(e) => updateEvent(event.id, 'assignedTo', e.target.value)} className="bg-transparent focus:outline-none focus:border-b border-gray-300 w-32" placeholder="Assigned to" />
                   </div>
                 </div>
                 
                 <input type="text" value={event.notes} onChange={(e) => updateEvent(event.id, 'notes', e.target.value)} className="w-full bg-transparent text-sm text-gray-500 italic focus:outline-none focus:border-b border-gray-300" placeholder="Additional notes..." />
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
