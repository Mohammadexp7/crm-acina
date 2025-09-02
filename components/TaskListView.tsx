import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import InProgressIcon from './icons/InProgressIcon';
import CheckCircleFilledIcon from './icons/CheckCircleFilledIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
    let colorClasses = '';
    switch (priority) {
        case TaskPriority.High: colorClasses = 'bg-red-100 text-red-800'; break;
        case TaskPriority.Medium: colorClasses = 'bg-yellow-100 text-yellow-800'; break;
        case TaskPriority.Low: colorClasses = 'bg-blue-100 text-blue-800'; break;
    }
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${colorClasses}`}>{priority}</span>;
};

const getStatusInfo = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.ToDo:
            return { Icon: ClipboardListIcon, color: 'text-primary', title: 'برای انجام' };
        case TaskStatus.InProgress:
            return { Icon: InProgressIcon, color: 'text-yellow-500', title: 'در حال انجام' };
        case TaskStatus.Done:
            return { Icon: CheckCircleFilledIcon, color: 'text-secondary', title: 'تکمیل شده' };
    }
};

interface AccordionSectionProps {
    status: TaskStatus;
    tasks: Task[];
    isOpen: boolean;
    onToggle: () => void;
    onEditTask: (task: Task) => void;
    onUpdateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ status, tasks, isOpen, onToggle, onEditTask, onUpdateTaskStatus }) => {
    const { Icon, color, title } = getStatusInfo(status);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <h2 className="text-lg font-bold text-text-dark">{title}</h2>
                    <span className="text-sm font-semibold bg-gray-200 text-text-light w-6 h-6 flex items-center justify-center rounded-md">{tasks.length}</span>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-text-light transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden`}
                style={{ maxHeight: isOpen ? `${tasks.length * 70 + 100}px` : '0px' }}
            >
                <div className="p-2 sm:p-4">
                    {tasks.length > 0 ? (
                        <div className="overflow-x-auto">
                             <table className="min-w-full">
                                <thead className="bg-gray-50 sr-only">
                                    <tr>
                                        <th className="py-3 px-4 text-right text-xs font-semibold text-text-light uppercase">عنوان</th>
                                        <th className="py-3 px-4 text-right text-xs font-semibold text-text-light uppercase">مسئول</th>
                                        <th className="py-3 px-4 text-right text-xs font-semibold text-text-light uppercase">اولویت</th>
                                        <th className="py-3 px-4 text-right text-xs font-semibold text-text-light uppercase">تاریخ</th>
                                        <th className="py-3 px-4 text-right text-xs font-semibold text-text-light uppercase">وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id} onClick={() => onEditTask(task)} className="border-b border-border-color last:border-0 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4 whitespace-nowrap text-sm font-bold text-text-dark w-2/5">{task.title}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex -space-x-2">
                                                    {task.assignedTo.map(member => (
                                                        <img key={member.id} src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-white" title={member.name} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4"><PriorityBadge priority={task.priority} /></td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1.5 text-sm text-text-light">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{task.dueDate}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                                                    className="text-sm bg-background border-none rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    {Object.values(TaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-text-light py-4">هیچ وظیفه‌ای در این وضعیت وجود ندارد.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

interface TaskListViewProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onUpdateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasks, onEditTask, onUpdateTaskStatus }) => {
    const [openSection, setOpenSection] = useState<TaskStatus>(TaskStatus.ToDo);

    const toggleSection = (status: TaskStatus) => {
        setOpenSection(openSection === status ? '' as TaskStatus : status);
    };

    const sections: { status: TaskStatus, tasks: Task[] }[] = [
        { status: TaskStatus.ToDo, tasks: tasks.filter(t => t.status === TaskStatus.ToDo) },
        { status: TaskStatus.InProgress, tasks: tasks.filter(t => t.status === TaskStatus.InProgress) },
        { status: TaskStatus.Done, tasks: tasks.filter(t => t.status === TaskStatus.Done) },
    ];

    return (
        <div className="space-y-4">
            {sections.map(({ status, tasks }) => (
                <AccordionSection
                    key={status}
                    status={status}
                    tasks={tasks}
                    isOpen={openSection === status}
                    onToggle={() => toggleSection(status)}
                    onEditTask={onEditTask}
                    onUpdateTaskStatus={onUpdateTaskStatus}
                />
            ))}
        </div>
    );
};

export default TaskListView;
