import React from 'react';
import { WeddingData, Gift } from '../../types';
import { useToast } from '../ToastContext';
import { v4 as uuidv4 } from 'uuid';
import { Gift as GiftIcon, Send, Clock, Plus, CheckSquare, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils';

export function Gifts({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();

  const addGift = () => {
    const newGift: Gift = {
      id: uuidv4(),
      guestId: null,
      giverName: 'New Gift Entry',
      gift: '',
      value: 0,
      dateReceived: new Date().toISOString().split('T')[0],
      thankYouSent: false,
      thankYouDate: '',
      notes: ''
    };
    updateData('gifts', [newGift, ...data.gifts]);
  };

  const updateItem = (id: string, field: keyof Gift, value: any) => {
    let updates = { [field]: value };
    if (field === 'thankYouSent') {
      updates['thankYouDate'] = value ? new Date().toISOString().split('T')[0] : '';
    }
    updateData('gifts', data.gifts.map(g => g.id === id ? { ...g, ...updates } : g));
  };
  
  const deleteGift = (id: string) => {
    if (confirm('Are you sure you want to delete this gift record?')) {
      updateData('gifts', data.gifts.filter(g => g.id !== id));
      addToast('Gift deleted');
    }
  };
  
  const totalValue = data.gifts.reduce((sum, g) => sum + g.value, 0);
  const totalSent = data.gifts.filter(g => g.thankYouSent).length;
  const totalGifts = data.gifts.length;

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold font-serif flex items-center gap-2"><GiftIcon className="w-8 h-8"/> Gifts & Thank Yous</h2>
        <button onClick={addGift} className="bg-wedding-dark text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-black transition">
          <Plus className="w-4 h-4" /> Add Gift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-wedding-blush flex items-center justify-between">
           <div>
             <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Total Received</div>
             <div className="text-3xl font-bold font-serif text-wedding-dark">{totalGifts}</div>
           </div>
           <GiftIcon className="w-10 h-10 text-wedding-blush opacity-50" />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-wedding-gold flex items-center justify-between">
           <div>
             <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Estimated Value</div>
             <div className="text-3xl font-bold font-serif text-wedding-gold">{formatCurrency(totalValue)}</div>
           </div>
           <div className="text-3xl text-wedding-gold opacity-50">$</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-wedding-sage flex items-center justify-between">
           <div>
             <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Thank Yous Sent</div>
             <div className="text-3xl font-bold font-serif text-wedding-sage">{totalSent} / {totalGifts}</div>
           </div>
           <Send className="w-10 h-10 text-wedding-sage opacity-50" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600">From</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Gift & Notes</th>
                <th className="py-3 px-4 font-semibold text-gray-600 w-32">Date Received</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-right w-24">Value</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-center w-32">Thank You Sent?</th>
                <th className="py-3 px-4 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.gifts.map(gift => (
                <tr key={gift.id} className={`border-b hover:bg-gray-50 transition group ${gift.thankYouSent ? 'bg-green-50/30' : ''}`}>
                  <td className="py-3 px-4">
                     <input type="text" value={gift.giverName} onChange={e => updateItem(gift.id, 'giverName', e.target.value)} className="font-bold bg-transparent border-b border-transparent focus:border-wedding-sage focus:outline-none w-full" placeholder="Giver Name" />
                  </td>
                  <td className="py-3 px-4">
                     <input type="text" value={gift.gift} onChange={e => updateItem(gift.id, 'gift', e.target.value)} className="font-medium bg-transparent border-b border-transparent focus:border-wedding-sage focus:outline-none w-full mb-1" placeholder="What did they give?" />
                     <input type="text" value={gift.notes} onChange={e => updateItem(gift.id, 'notes', e.target.value)} className="text-xs text-gray-500 italic bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none w-full" placeholder="Personalization notes..." />
                  </td>
                  <td className="py-3 px-4">
                     <input type="date" value={gift.dateReceived} onChange={e => updateItem(gift.id, 'dateReceived', e.target.value)} className="text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-wedding-sage rounded" />
                  </td>
                  <td className="py-3 px-4 text-right">
                     <input type="number" value={gift.value} onChange={e => updateItem(gift.id, 'value', Number(e.target.value))} className="font-medium text-right bg-transparent border-b border-transparent focus:border-wedding-sage focus:outline-none w-full" placeholder="0" />
                  </td>
                  <td className="py-3 px-4 text-center">
                     <button 
                       onClick={() => updateItem(gift.id, 'thankYouSent', !gift.thankYouSent)}
                       className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition ${gift.thankYouSent ? 'bg-wedding-sage text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        {gift.thankYouSent ? <CheckSquare className="w-3 h-3"/> : <Clock className="w-3 h-3"/>}
                        {gift.thankYouSent ? 'Sent' : 'Pending'}
                     </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                     <button onClick={() => deleteGift(gift.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {data.gifts.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-gray-500 italic">No gifts logged yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
