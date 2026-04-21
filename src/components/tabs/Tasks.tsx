import React, { useState } from 'react';
import { WeddingData, Task } from '../../types';
import { useToast } from '../ToastContext';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function Tasks({ data, updateData }: { data: WeddingData, updateData: any }) {
  const { addToast } = useToast();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTimeframe, setNewTaskTimeframe] = useState('6-9 Months Before');

  const toggleTask = (id: string) => {
    const newTasks = data.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    updateData('tasks', newTasks);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle.trim(),
      completed: false,
      timeframe: newTaskTimeframe
    };
    updateData('tasks', [...data.tasks, newTask]);
    setNewTaskTitle('');
    addToast('Task added');
  };

  const deleteTask = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      updateData('tasks', data.tasks.filter(t => t.id !== id));
      addToast('Task deleted');
    }
  };

  const tasksByTimeframe = data.tasks.reduce((acc, task) => {
    if (!acc[task.timeframe]) acc[task.timeframe] = [];
    acc[task.timeframe].push(task);
    return acc;
  }, {} as Record<string, typeof data.tasks>);

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold font-serif">Tasks & Timeline</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl">
        <div className="mb-6 flex justify-between items-center bg-wedding-cream p-4 rounded-lg">
           <div>
             <div className="font-bold text-xl text-wedding-dark">Overall Progress</div>
             <div className="text-sm text-gray-500">{data.tasks.filter(t => t.completed).length} of {data.tasks.length} tasks completed</div>
           </div>
           <div className="w-1/2 bg-white rounded-full h-4 shadow-inner">
             <div className="bg-wedding-sage h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (data.tasks.filter(t => t.completed).length/data.tasks.length)*100)}%` }}></div>
           </div>
        </div>

        <div className="space-y-8">
          {Object.entries(tasksByTimeframe).map(([timeframe, tasks]) => (
            <div key={timeframe}>
              <h3 className="font-serif text-xl border-b pb-2 mb-4 text-wedding-gold font-semibold">{timeframe}</h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} 
                       className={`flex items-center gap-4 p-3 rounded-lg border transition cursor-pointer hover:bg-gray-50 group
                        ${task.completed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 shadow-sm'}`}
                       onClick={() => toggleTask(task.id)}>
                    <button className="focus:outline-none shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-wedding-sage" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 hover:text-wedding-sage" />
                      )}
                    </button>
                    <span className={`font-medium text-lg flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-wedding-dark'}`}>
                       {task.title}
                    </span>
                    <button onClick={(e) => deleteTask(e, task.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-2">
                       <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={addTask} className="mt-8 pt-6 border-t flex gap-4 items-end">
           <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 uppercase">New Task Description</label>
              <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="e.g. Call the caterer" className="w-full mt-1 border-b focus:border-wedding-sage outline-none py-2 bg-transparent" />
           </div>
           <div className="w-48">
              <label className="text-xs font-medium text-gray-500 uppercase">Timeframe</label>
              <select value={newTaskTimeframe} onChange={e => setNewTaskTimeframe(e.target.value)} className="w-full mt-1 border-b py-2 bg-transparent outline-none cursor-pointer">
                 <option>12+ Months Before</option>
                 <option>9-12 Months Before</option>
                 <option>6-9 Months Before</option>
                 <option>3-6 Months Before</option>
                 <option>1-3 Months Before</option>
                 <option>Week Of Wedding</option>
              </select>
           </div>
           <button type="submit" disabled={!newTaskTitle.trim()} className="bg-wedding-sage text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition flex items-center gap-2 font-medium h-10">
              <Plus className="w-4 h-4"/> Add Task
           </button>
        </form>
      </div>
    </div>
  );
}
