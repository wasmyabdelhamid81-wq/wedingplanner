import React from 'react';
import { WeddingData, Expense } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useToast } from '../ToastContext';
import { formatCurrency } from '../../utils';
import { Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const COLORS = ['#E8D5D1', '#A8B8A0', '#D4AF37', '#F5F3F0', '#3D3535', '#C0A0A0', '#90A090', '#B09037'];

export function Budget({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  
  const totalBudget = data.budget.totalBudget;
  const totalSpent = data.budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalPaid = data.budget.expenses.reduce((sum, e) => sum + e.paid, 0);
  const remaining = totalBudget - totalSpent;

  const chartData = data.budget.expenses.map(e => ({ name: e.category, value: e.amount }));

  const updateBudget = (val: number) => {
    updateData('budget', { ...data.budget, totalBudget: val });
  };

  const addExpense = () => {
    const newExpense: Expense = {
      id: uuidv4(),
      category: 'Other',
      name: 'New Expense',
      amount: 0,
      paid: 0
    };
    updateData('budget', { ...data.budget, expenses: [...data.budget.expenses, newExpense] });
    addToast('Expense added');
  };

  const updateExpense = (id: string, field: keyof Expense, value: any) => {
    const newExpenses = data.budget.expenses.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateData('budget', { ...data.budget, expenses: newExpenses });
  };

  const deleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      const newExpenses = data.budget.expenses.filter(e => e.id !== id);
      updateData('budget', { ...data.budget, expenses: newExpenses });
      addToast('Expense deleted');
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between shrink-0 gap-4">
        <h2 className="text-3xl font-bold font-serif">Budget Tracker</h2>
        <div className="flex items-center gap-2">
           <label className="font-medium">Total Budget:</label>
           <input 
             type="number" 
             value={totalBudget} 
             onChange={(e) => updateBudget(Number(e.target.value))} 
             className="border rounded p-2 text-lg font-bold w-32 focus:outline-none focus:ring-2 focus:ring-wedding-sage"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">Spent / Allocated</div>
              <div className="text-2xl font-bold text-wedding-dark">{formatCurrency(totalSpent)}</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">Actually Paid</div>
              <div className="text-2xl font-bold text-wedding-sage">{formatCurrency(totalPaid)}</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">Remaining Budget</div>
              <div className={`text-2xl font-bold ${remaining < 0 ? 'text-red-500' : 'text-wedding-gold'}`}>{formatCurrency(remaining)}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2">
                  <th className="py-3 px-2 font-semibold">Category</th>
                  <th className="py-3 px-2 font-semibold">Expense / Vendor</th>
                  <th className="py-3 px-2 font-semibold text-right">Cost</th>
                  <th className="py-3 px-2 font-semibold text-right">Paid</th>
                  <th className="py-3 px-2 font-semibold text-right">Balance</th>
                  <th className="py-3 px-2 font-semibold w-10"></th>
                </tr>
              </thead>
              <tbody>
                {data.budget.expenses.map(expense => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50 group">
                    <td className="py-2 px-2 text-sm text-gray-600 font-medium">
                       <input value={expense.category} onChange={e => updateExpense(expense.id, 'category', e.target.value)} className="w-full bg-transparent border-b border-transparent focus:border-gray-300 outline-none" />
                    </td>
                    <td className="py-2 px-2 font-medium">
                       <input value={expense.name} onChange={e => updateExpense(expense.id, 'name', e.target.value)} className="w-full bg-transparent border-b border-transparent focus:border-gray-300 outline-none" />
                    </td>
                    <td className="py-2 px-2 text-right">
                       <input type="number" value={expense.amount} onChange={e => updateExpense(expense.id, 'amount', Number(e.target.value))} className="w-24 text-right bg-transparent border-b border-transparent focus:border-gray-300 outline-none" />
                    </td>
                    <td className="py-2 px-2 text-right">
                       <input type="number" value={expense.paid} onChange={e => updateExpense(expense.id, 'paid', Number(e.target.value))} className="w-24 text-right bg-transparent border-b border-transparent focus:border-gray-300 outline-none" />
                    </td>
                    <td className="py-2 px-2 text-right text-wedding-dark font-medium">{formatCurrency(expense.amount - expense.paid)}</td>
                    <td className="py-2 px-2 text-center">
                       <button onClick={() => deleteExpense(expense.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addExpense} className="mt-4 text-wedding-sage font-medium hover:underline flex items-center gap-1">+ Add Expense</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-serif text-xl font-bold mb-4 text-center">Budget Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
