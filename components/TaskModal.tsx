import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus, TeamMember } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    onDelete: (taskId: number) => void;
    task: Task | null;
    teamMembers: TeamMember[];
    defaultStatus: TaskStatus;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, onDelete, task, teamMembers, defaultStatus }) => {
    const [formData, setFormData] = useState<Partial<Task>>({});

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                assignedTo: task.assignedTo.map(m => m) // Create a new array
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: defaultStatus,
                priority: TaskPriority.Medium,
                assignedTo: [],
                dueDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD format
            });
        }
    }, [task, isOpen, defaultStatus]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleMemberToggle = (member: TeamMember) => {
        const currentAssigned = formData.assignedTo || [];
        const isAssigned = currentAssigned.some(m => m.id === member.id);
        let newAssigned: TeamMember[];
        if (isAssigned) {
            newAssigned = currentAssigned.filter(m => m.id !== member.id);
        } else {
            newAssigned = [...currentAssigned, member];
        }
        setFormData(prev => ({ ...prev, assignedTo: newAssigned }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.title?.trim()) return;

        const taskToSave: Task = {
            id: task?.id || Date.now(),
            ...formData,
        } as Task;
        
        onSave(taskToSave);
        onClose();
    };
    
    const handleDelete = () => {
        if (task) {
            onDelete(task.id);
            onClose();
        }
    };
    
    const isMemberAssigned = (memberId: number) => {
        return formData.assignedTo?.some(m => m.id === memberId) ?? false;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-color">
                    <h2 className="text-xl font-bold text-text-dark">{task ? 'ویرایش تسک' : 'ایجاد تسک جدید'}</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-light mb-1.5">عنوان</label>
                        <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-light mb-1.5">توضیحات</label>
                        <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-text-light mb-1.5">اولویت</label>
                            <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
                                {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-text-light mb-1.5">تاریخ سررسید</label>
                            <input type="text" name="dueDate" id="dueDate" value={formData.dueDate || ''} onChange={handleChange} placeholder="مثال: ۱۴۰۲/۱۲/۱۰" className="w-full px-4 py-2.5 border border-border-color bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-light mb-1.5">افراد مسئول</label>
                        <div className="flex flex-wrap gap-3">
                            {teamMembers.map(member => (
                                <button type="button" key={member.id} onClick={() => handleMemberToggle(member)} className={`flex items-center gap-2 p-2 rounded-full border-2 transition ${isMemberAssigned(member.id) ? 'border-primary bg-primary-light' : 'border-transparent bg-background'}`}>
                                    <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover"/>
                                    <span className="text-sm font-semibold text-text-dark">{member.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="p-6 border-t border-border-color flex justify-between items-center">
                    <div>
                        {task && (
                             <button type="button" onClick={handleDelete} className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold text-sm p-2 rounded-md hover:bg-red-50 transition-colors">
                                <TrashIcon className="w-5 h-5" />
                                <span>حذف تسک</span>
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition">لغو</button>
                        <button type="submit" onClick={handleSubmit} className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">ذخیره</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;