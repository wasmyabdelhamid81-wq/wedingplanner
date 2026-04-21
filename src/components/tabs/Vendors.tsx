import React, { useState } from 'react';
import { WeddingData, Vendor } from '../../types';
import { useToast } from '../ToastContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Building2, Phone, Mail, Link as LinkIcon, DollarSign, User, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils';

export function Vendors({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(data.vendors.map(v => v.category)))];
  
  const filteredVendors = filter === 'All' ? data.vendors : data.vendors.filter(v => v.category === filter);

  const addVendor = () => {
    const newVendor: Vendor = {
       id: uuidv4(),
       name: 'New Vendor',
       category: 'Other',
       contactName: '',
       phone: '',
       email: '',
       price: 0,
       depositPaid: 0,
       status: 'contacted',
       contractSigned: false,
       website: '',
       notes: ''
    };
    updateData('vendors', [...data.vendors, newVendor]);
    addToast('Vendor added');
  };

  const updateVendor = (id: string, field: keyof Vendor, value: any) => {
    updateData('vendors', data.vendors.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const deleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      updateData('vendors', data.vendors.filter(v => v.id !== id));
      addToast('Vendor deleted');
    }
  };

  const totalCost = data.vendors.reduce((sum, v) => sum + v.price, 0);
  const totalPaid = data.vendors.reduce((sum, v) => sum + v.depositPaid, 0);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-serif">Vendors Tracker</h2>
          <div className="text-gray-500 mt-2 flex gap-4">
             <span>Total: <strong className="text-wedding-dark">{formatCurrency(totalCost)}</strong></span>
             <span>Paid: <strong className="text-wedding-sage">{formatCurrency(totalPaid)}</strong></span>
          </div>
        </div>
        <button onClick={addVendor} className="bg-wedding-sage text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-green-700 transition">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
            ${filter === c ? 'bg-wedding-dark text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
             {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
             <div className="bg-gradient-to-r from-gray-50 to-white px-5 py-4 border-b flex justify-between items-start gap-4">
                <div className="flex-1">
                  <input type="text" value={vendor.name} onChange={(e) => updateVendor(vendor.id, 'name', e.target.value)} className="font-bold text-lg w-full bg-transparent focus:outline-none focus:border-b border-wedding-sage" />
                  <input type="text" value={vendor.category} onChange={(e) => updateVendor(vendor.id, 'category', e.target.value)} className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-transparent w-full focus:outline-none mt-1" />
                </div>
                <select value={vendor.status} onChange={(e) => updateVendor(vendor.id, 'status', e.target.value)}
                  className={`text-xs px-2 py-1 rounded border focus:outline-none font-medium
                    ${vendor.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                      vendor.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      vendor.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
             </div>
             <div className="p-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                   <User className="w-4 h-4 text-gray-400" />
                   <input type="text" value={vendor.contactName} onChange={(e) => updateVendor(vendor.id, 'contactName', e.target.value)} placeholder="Contact Name" className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none" />
                </div>
                <div className="flex items-center gap-3">
                   <Phone className="w-4 h-4 text-gray-400" />
                   <input type="text" value={vendor.phone} onChange={(e) => updateVendor(vendor.id, 'phone', e.target.value)} placeholder="Phone" className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none" />
                </div>
                <div className="flex items-center gap-3">
                   <Mail className="w-4 h-4 text-gray-400" />
                   <input type="email" value={vendor.email} onChange={(e) => updateVendor(vendor.id, 'email', e.target.value)} placeholder="Email" className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none" />
                </div>
                
                <div className="pt-4 border-t grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Total Price</label>
                     <div className="flex items-center">
                       <DollarSign className="w-4 h-4 text-gray-400" />
                       <input type="number" value={vendor.price} onChange={(e) => updateVendor(vendor.id, 'price', Number(e.target.value))} className="w-full bg-transparent font-semibold border-b border-transparent focus:border-gray-300 focus:outline-none" />
                     </div>
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Paid</label>
                     <div className="flex items-center">
                       <DollarSign className="w-4 h-4 text-gray-400" />
                       <input type="number" value={vendor.depositPaid} onChange={(e) => updateVendor(vendor.id, 'depositPaid', Number(e.target.value))} className="w-full bg-transparent font-semibold border-b border-transparent focus:border-gray-300 focus:outline-none text-wedding-sage" />
                     </div>
                   </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                   <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" checked={vendor.contractSigned} onChange={(e) => updateVendor(vendor.id, 'contractSigned', e.target.checked)} className="rounded text-wedding-sage focus:ring-wedding-sage" />
                     <span className="text-sm font-medium">Contract Signed</span>
                   </label>
                   <button onClick={() => deleteVendor(vendor.id)} className="text-gray-400 hover:text-red-500 transition" title="Delete Vendor">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
