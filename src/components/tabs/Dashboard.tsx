import React from 'react';
import { WeddingData } from '../../types';
import { formatCurrency } from '../../utils';

export function Dashboard({ data, updateData }: { data: WeddingData, updateData: any }) {
  // Compute overall stats
  const totalBudget = data.budget.totalBudget;
  const totalSpent = data.budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetPercent = Math.min(100, (totalSpent/totalBudget)*100);

  // Calculate days left
  const wedDate = new Date(data.weddingDetails.date);
  const today = new Date();
  const diffTime = wedDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Find next event
  const sortedEvents = [...data.weddingDaySchedule].sort((a,b) => a.time.localeCompare(b.time));
  const tables = data.seating.tables.filter(t => t.guestIds.length > 0).slice(0, 3);
  const totalShots = data.photography.mustHaveShots.length;
  const capturedShots = data.photography.mustHaveShots.filter(s => s.captured).length;
  const giftsReceived = data.gifts.length;
  const pendingThanks = data.gifts.filter(g => !g.thankYouSent).length;

  return (
    <div className="fade-in max-w-6xl mx-auto flex flex-col h-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[24px]">
        <div>
          <h1 className="text-[32px] font-serif font-bold text-wedding-dark leading-tight">Wedding Command Center</h1>
          <div className="flex gap-[16px] text-[11px] uppercase tracking-[1px] mt-1 items-center">
            <span className="text-wedding-gold flex items-center font-bold">
              <span className="w-[8px] h-[8px] bg-wedding-gold rounded-full mr-2"></span> Fully Synced
            </span>
            <span className="text-gray-600 font-medium tracking-[1px]">Next event: {sortedEvents[0]?.event || 'None'}</span>
          </div>
        </div>
        <div className="bg-white px-[16px] py-[8px] rounded-[20px] border border-wedding-blush text-wedding-dark font-semibold text-[13px] shadow-sm">
          {daysLeft > 0 ? `${daysLeft} Days Until I Do` : 'Today is the Day!'}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-[16px] flex-1 pb-8 md:pb-0">
        
        {/* Day-Of Timeline */}
        <div className="bento-card md:col-span-2 md:row-span-2">
          <div className="font-bold mb-[16px] flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Day-Of Timeline <i className="text-[12px] font-normal opacity-50 not-italic">{wedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</i>
          </div>
          <div className="space-y-[14px]">
             {sortedEvents.slice(0, 4).map((event, idx) => (
               <div key={event.id} className="flex gap-[12px] relative">
                 <div className="absolute left-[4px] top-[20px] bottom-[-10px] w-px bg-wedding-blush z-0"></div>
                 <div className="w-[9px] h-[9px] rounded-full bg-wedding-gold mt-[4px] shrink-0 z-10 relative"></div>
                 <div>
                   <div className="font-semibold text-[13px]">{event.time} — {event.event}</div>
                   <div className="text-[11px] opacity-70 mt-0.5">{event.location} • {event.assignedTo}</div>
                 </div>
               </div>
             ))}
             {sortedEvents.length === 0 && <div className="text-sm opacity-50">No events scheduled.</div>}
          </div>
        </div>

        {/* Moodboard */}
        <div className="bento-card md:col-span-1">
          <div className="font-bold mb-[16px] flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Moodboard <i className="text-[12px] font-normal opacity-50 not-italic">{data.moodboard.theme || 'Inspiration'}</i>
          </div>
          <div className="flex gap-[8px]">
             {data.moodboard.colorSwatches.slice(0, 5).map((color, i) => (
               <div key={i} className="w-[32px] h-[32px] rounded-full border-[2px] border-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]" style={{ backgroundColor: color }}></div>
             ))}
          </div>
          <div className="mt-[12px] text-[11px] italic opacity-80 leading-relaxed line-clamp-3">
             "{data.moodboard.inspirationNotes || 'Your wedding vision...'}"
          </div>
        </div>

        {/* Budget */}
        <div className="bento-card md:col-span-1">
          <div className="font-bold mb-2 flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Budget <i className="text-[12px] font-normal opacity-50 not-italic">{Math.round(budgetPercent)}% Spent</i>
          </div>
          <div className="text-center p-[10px] flex-1 flex flex-col justify-center">
             <div className="text-[24px] font-bold leading-tight">{formatCurrency(totalSpent)}</div>
             <div className="text-[10px] opacity-50 uppercase tracking-wider mt-1 font-bold">OF {formatCurrency(totalBudget)} TOTAL</div>
          </div>
          <div className="h-[4px] bg-[#eee] rounded-[2px] mt-[8px] w-full">
             <div className="h-full bg-wedding-sage rounded-[2px]" style={{ width: `${budgetPercent}%` }}></div>
          </div>
        </div>

        {/* Vendor Status */}
        <div className="bento-card md:row-span-2">
          <div className="font-bold mb-[16px] flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Vendor Status
          </div>
          <div className="flex flex-col flex-1 divide-y divide-wedding-cream">
             {data.vendors.slice(0, 5).map((v) => (
               <div key={v.id} className="flex justify-between items-center py-[8px]">
                 <div>
                   <div className="font-semibold text-[12px]">{v.name}</div>
                   <div className="text-[10px] opacity-50 uppercase">{v.category}</div>
                 </div>
                 <span className={`bento-badge ${v.status === 'confirmed' ? 'bg-wedding-sage text-white' : v.status === 'pending' ? 'bg-wedding-gold text-white' : 'bg-wedding-blush text-wedding-dark'}`}>
                   {v.status}
                 </span>
               </div>
             ))}
             {data.vendors.length === 0 && <div className="text-[12px] opacity-50 pt-[8px]">No vendors added.</div>}
          </div>
        </div>

        {/* Seating Assignment */}
        <div className="bento-card md:col-span-2">
          <div className="font-bold mb-[16px] flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Seating Assignment <i className="text-[12px] font-normal opacity-50 not-italic">{data.guests.filter(g=>g.rsvp==='attending').length} Guests Confirmed</i>
          </div>
          <div className="grid grid-cols-3 gap-[8px]">
             {tables.map(table => {
               const count = table.guestIds.length;
               return (
                 <div key={table.tableNumber} className="bg-wedding-cream p-[10px] rounded-[8px] text-center flex flex-col justify-center">
                   <div className="font-bold text-[11px]">Table {table.tableNumber.toString().padStart(2, '0')}</div>
                   <div className="text-[11px] opacity-80 mt-1">{count}/{data.seating.seatsPerTable} Seats</div>
                   <div className="text-[9px] text-wedding-sage mt-[4px] font-semibold">{count === data.seating.seatsPerTable ? 'Full' : '+ Available'}</div>
                 </div>
               );
             })}
             {tables.length === 0 && <div className="col-span-3 text-sm opacity-50 text-center py-2">No tables assigned.</div>}
          </div>
        </div>

        {/* Photography */}
        <div className="bento-card md:col-span-1">
          <div className="font-bold mb-2 flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Photography
          </div>
          <div className="text-[24px] font-bold">{capturedShots} / {totalShots}</div>
          <div className="text-[11px] opacity-60">Must-Have Shots Checked</div>
          <div className="mt-[10px] flex flex-col flex-1 divide-y divide-wedding-cream">
             {data.photography.mustHaveShots.slice(0, 2).map((s) => (
               <div key={s.id} className="flex justify-between items-center text-[10px] py-[8px]">
                 <span className="truncate pr-2">{s.shot}</span>
                 <span className={s.captured ? 'text-wedding-sage font-bold' : 'opacity-40'}>{s.captured ? '✓' : '--'}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Gifts & Thanks */}
        <div className="bento-card md:col-span-1">
          <div className="font-bold mb-2 flex justify-between items-center text-wedding-dark opacity-90 text-[16px]">
             Gifts & Thanks
          </div>
          <div className="text-[24px] font-bold">{giftsReceived}</div>
          <div className="text-[11px] opacity-60">Gifts Received</div>
          <div className="mt-[8px]">
             <span className="bento-badge bg-wedding-blush text-wedding-dark inline-block">{pendingThanks} Pending Thank Yous</span>
          </div>
        </div>

      </div>
    </div>
  );
}
