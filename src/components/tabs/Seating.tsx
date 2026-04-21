import React, { useState } from 'react';
import { WeddingData, Table, Guest } from '../../types';
import { useToast } from '../ToastContext';
import { Users, Grid3x3, Plus, Trash2 } from 'lucide-react';

export function Seating({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();

  const attendingGuests = data.guests.filter(g => g.rsvp === 'attending');
  
  const autoAssign = () => {
    const unassigned = data.guests.filter(g => g.rsvp === 'attending' && !g.table);
    if (unassigned.length === 0) {
       addToast('All guests are already assigned.');
       return;
    }

    let currentTables = [...data.seating.tables];
    let nextTableNum = currentTables.length > 0 ? Math.max(...currentTables.map(t => t.tableNumber)) + 1 : 1;
    
    let guestUpdates = [...data.guests];

    unassigned.forEach(guest => {
       // Find a table with enough seats
       let placed = false;
       for (let i = 0; i < currentTables.length; i++) {
          const t = currentTables[i];
          const guestsAtTable = t.guestIds.map(id => guestUpdates.find(g => g.id === id)).filter(Boolean) as Guest[];
          const seatsUsed = guestsAtTable.reduce((sum, g) => sum + g.partySize, 0);
          
          if (seatsUsed + guest.partySize <= data.seating.seatsPerTable) {
             t.guestIds.push(guest.id);
             const gIdx = guestUpdates.findIndex(g => g.id === guest.id);
             if (gIdx > -1) guestUpdates[gIdx] = { ...guestUpdates[gIdx], table: t.tableNumber };
             placed = true;
             break;
          }
       }

       if (!placed) {
          // create new table
          currentTables.push({ tableNumber: nextTableNum, guestIds: [guest.id] });
          const gIdx = guestUpdates.findIndex(g => g.id === guest.id);
          if (gIdx > -1) guestUpdates[gIdx] = { ...guestUpdates[gIdx], table: nextTableNum };
          nextTableNum++;
       }
    });

    updateData('guests', guestUpdates);
    updateData('seating', { ...data.seating, tables: currentTables });
    addToast('Auto-assigned remaining guests');
  };

  const getGuestDetails = (id: string) => data.guests.find(g => g.id === id);

  const unassignedGuests = attendingGuests.filter(g => !g.table);

  const handleDragStart = (e: React.DragEvent, guestId: string) => {
     e.dataTransfer.setData('guestId', guestId);
  };

  const handleDropToTable = (e: React.DragEvent, tableNumber: number) => {
     e.preventDefault();
     const guestId = e.dataTransfer.getData('guestId');
     if (!guestId) return;

     const guest = data.guests.find(g => g.id === guestId);
     if (!guest) return;

     // Remove from old table if exists
     let newTables = data.seating.tables.map(t => ({
        ...t,
        guestIds: t.guestIds.filter(id => id !== guestId)
     }));

     // Add to new table
     const tableIdx = newTables.findIndex(t => t.tableNumber === tableNumber);
     if (tableIdx > -1) {
        newTables[tableIdx].guestIds.push(guestId);
     } else {
        newTables.push({ tableNumber, guestIds: [guestId] });
     }

     updateData('seating', { ...data.seating, tables: newTables });
     
     const guestUpdates = data.guests.map(g => g.id === guestId ? { ...g, table: tableNumber } : g);
     updateData('guests', guestUpdates);
  };

  const handleDragOver = (e: React.DragEvent) => {
     e.preventDefault(); // necessary to allow dropping
  };

  const handleDropToUnassigned = (e: React.DragEvent) => {
     e.preventDefault();
     const guestId = e.dataTransfer.getData('guestId');
     if (!guestId) return;

     let newTables = data.seating.tables.map(t => ({
        ...t,
        guestIds: t.guestIds.filter(id => id !== guestId)
     }));

     updateData('seating', { ...data.seating, tables: newTables });
     const guestUpdates = data.guests.map(g => g.id === guestId ? { ...g, table: null } : g);
     updateData('guests', guestUpdates);
  };
  
  const deleteTable = (tableNumber: number) => {
    if (confirm(`Are you sure you want to delete Table ${tableNumber}? All guests at this table will be unassigned.`)) {
       const tableToDelete = data.seating.tables.find(t => t.tableNumber === tableNumber);
       if (!tableToDelete) return;

       // Unassign guests
       const guestUpdates = data.guests.map(g => tableToDelete.guestIds.includes(g.id) ? { ...g, table: null } : g);
       
       // Remove table
       const newTables = data.seating.tables.filter(t => t.tableNumber !== tableNumber);
       
       updateData('guests', guestUpdates);
       updateData('seating', { ...data.seating, tables: newTables });
       addToast(`Table ${tableNumber} deleted`);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold font-serif flex items-center gap-2"><Grid3x3 className="w-8 h-8"/> Seating Assignment</h2>
        <div className="flex items-center gap-4">
           <label className="text-sm font-medium">Seats per table:</label>
           <input type="number" min="1" value={data.seating.seatsPerTable} 
              onChange={(e) => updateData('seating', { ...data.seating, seatsPerTable: Number(e.target.value) })}
              className="w-16 border rounded p-1 text-center font-bold" />
           <button onClick={autoAssign} className="bg-wedding-dark text-white px-4 py-2 rounded shadow hover:bg-black transition text-sm font-medium">
              Auto-Assign
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div 
           className="lg:col-span-1 bg-white p-4 rounded-xl shadow-sm h-fit"
           onDrop={handleDropToUnassigned}
           onDragOver={handleDragOver}
        >
           <h3 className="font-bold text-lg mb-4 border-b pb-2 flex justify-between">
              Unassigned 
              <span className="bg-gray-100 text-gray-600 px-2 rounded-full text-sm">{unassignedGuests.length}</span>
           </h3>
           <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
             {unassignedGuests.map(g => (
               <div key={g.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, g.id)}
                  className="p-3 bg-gray-50 border rounded flex justify-between items-center cursor-move hover:bg-gray-100 transition shadow-sm active:cursor-grabbing">
                  <div>
                    <div className="font-medium">{g.name}</div>
                    <div className="text-xs text-gray-500">{g.meal || 'No meal set'}</div>
                  </div>
                  <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm">x{g.partySize}</div>
               </div>
             ))}
             {unassignedGuests.length === 0 && <div className="text-center text-gray-500 py-4 italic text-sm">All guests seated!</div>}
           </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {data.seating.tables.map(table => {
             const tableGuests = table.guestIds.map(id => getGuestDetails(id)).filter(Boolean);
             const seatsUsed = tableGuests.reduce((sum, g) => sum + (g?.partySize || 0), 0);
             return (
               <div key={table.tableNumber} 
                 onDrop={(e) => handleDropToTable(e, table.tableNumber)}
                 onDragOver={handleDragOver}
                 className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-colors`}>
                 <div className={`p-4 border-b flex justify-between items-center group/header ${seatsUsed > data.seating.seatsPerTable ? 'bg-red-50' : 'bg-wedding-cream'}`}>
                    <div className="flex items-center gap-2">
                       <h4 className="font-bold font-serif text-lg">Table {table.tableNumber}</h4>
                       <button onClick={() => deleteTable(table.tableNumber)} className="opacity-0 group-hover/header:opacity-100 text-gray-400 hover:text-red-500 transition ml-2">
                          <Trash2 className="w-4 h-4"/>
                       </button>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${seatsUsed > data.seating.seatsPerTable ? 'bg-red-200 text-red-800' : 'bg-white'}`}>
                      {seatsUsed} / {data.seating.seatsPerTable}
                    </span>
                 </div>
                 <div className="p-4 min-h-[150px] space-y-2">
                    {tableGuests.map(g => g && (
                      <div key={g.id} 
                         draggable
                         onDragStart={(e) => handleDragStart(e, g.id)}
                         className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0 cursor-move bg-white hover:bg-gray-50 p-1 rounded">
                         <div>
                            <span className="font-medium">{g.name}</span>
                            <span className="text-xs text-gray-400 block">{g.meal}</span>
                         </div>
                         <div className="text-xs flex gap-2">
                            <span className="text-gray-500 border px-1 rounded flex items-center justify-center">x{g.partySize}</span>
                            <button onClick={() => {
                               const newTables = data.seating.tables.map(t => t.tableNumber === table.tableNumber ? { ...t, guestIds: t.guestIds.filter(id => id !== g.id) } : t);
                               updateData('seating', { ...data.seating, tables: newTables });
                               const updatedGuests = data.guests.map(guest => guest.id === g.id ? { ...guest, table: null } : guest);
                               updateData('guests', updatedGuests);
                            }} className="text-red-400 hover:text-red-600 px-2 py-1 bg-red-50 rounded">×</button>
                         </div>
                      </div>
                    ))}
                    {tableGuests.length === 0 && <div className="text-gray-400 text-center text-sm italic mt-8 pointer-events-none">Empty Table. Drop guests here.</div>}
                 </div>
               </div>
             )
           })}
           <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center min-h-[200px] hover:bg-gray-100 transition cursor-pointer"
             onClick={() => {
                const nextNum = data.seating.tables.length > 0 ? Math.max(...data.seating.tables.map(t => t.tableNumber)) + 1 : 1;
                updateData('seating', { ...data.seating, tables: [...data.seating.tables, { tableNumber: nextNum, guestIds: [] }] });
             }}>
             <div className="text-gray-500 font-medium flex items-center gap-2"><Plus className="w-5 h-5"/> Add Table</div>
           </div>
        </div>
      </div>
    </div>
  );
}
