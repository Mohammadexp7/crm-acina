import React, { useState, useMemo } from 'react';
import { Team, Task, TaskStatus, TaskPriority, TeamMember } from '../types';
import PlusCircleIcon from './icons/PlusCircleIcon';
import CalendarIcon from './icons/CalendarIcon';
import TaskModal from './TaskModal';
import ClipboardListIcon from './icons/ClipboardListIcon';
import InProgressIcon from './icons/InProgressIcon';
import CheckCircleFilledIcon from './icons/CheckCircleFilledIcon';
import UsersGroupIcon from './icons/UsersGroupIcon';
import ManageTeamsModal from './ManageTeamsModal';
import TaskListView from './TaskListView';
import BoardIcon from './icons/BoardIcon';
import ListIcon from './icons/ListIcon';

const initialTeams: Team[] = [
    { id: 1, name: 'تیم بازاریابی', memberIds: [1, 2, 3] },
    { id: 2, name: 'تیم فروش', memberIds: [4, 5] },
];

const initialTeamMembers: TeamMember[] = [
  { id: 1, name: 'محمد امینی', email: 'm.amini@example.com', avatar: 'https://picsum.photos/seed/1/100', role: 'مدیر بازاریابی' },
  { id: 2, name: 'سارا حسینی', email: 's.hoseini@example.com', avatar: 'https://picsum.photos/seed/4/100', role: 'متخصص محتوا' },
  { id: 3, name: 'علی رضایی', email: 'a.rezaei@example.com', avatar: 'https://picsum.photos/seed/10/100', role: 'کارشناس SEO' },
  { id: 4, name: 'زهرا احمدی', email: 'z.ahmadi@example.com', avatar: 'https://picsum.photos/seed/2/100', role: 'مدیر فروش' },
  { id: 5, name: 'رضا اکبری', email: 'r.akbari@example.com', avatar: 'https://picsum.photos/seed/5/100', role: 'کارشناس فروش' },
];

const initialTasks: Task[] = [
  // Marketing Tasks (teamId: 1)
  { id: 1, teamId: 1, title: 'طراحی بنرهای تبلیغاتی یلدا', description: 'طراحی ۳ بنر در سایزهای مختلف برای کمپین ایمیل.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '1402-09-25', assignedTo: [initialTeamMembers[1]] },
  { id: 2, teamId: 1, title: 'تحلیل نتایج کمپین قبلی', description: 'بررسی نرخ باز شدن ایمیل‌ها و کلیک‌ها.', status: TaskStatus.Done, priority: TaskPriority.Medium, dueDate: '1402-09-15', assignedTo: [initialTeamMembers[0]] },
  { id: 3, teamId: 1, title: 'برنامه ریزی کمپین فصل بهار', description: 'ایده‌پردازی و تعیین اهداف اولیه.', status: TaskStatus.ToDo, priority: TaskPriority.High, dueDate: '1402-12-10', assignedTo: [initialTeamMembers[0], initialTeamMembers[2]] },
  { id: 4, teamId: 1, title: 'نهایی سازی محتوای ایمیل', description: '', status: TaskStatus.InProgress, priority: TaskPriority.Medium, dueDate: '1402-09-22', assignedTo: [initialTeamMembers[0]] },
  { id: 5, teamId: 1, title: 'تحقیق کلمات کلیدی برای وبلاگ', description: 'پیدا کردن ۱۰ کلمه کلیدی با رقابت پایین.', status: TaskStatus.ToDo, priority: TaskPriority.Low, dueDate: '1402-10-05', assignedTo: [initialTeamMembers[2]] },
  { id: 6, teamId: 1, title: 'جلسه با تیم فروش', description: 'همگام‌سازی در مورد تخفیف‌های جدید.', status: TaskStatus.Done, priority: TaskPriority.Low, dueDate: '1402-09-18', assignedTo: [initialTeamMembers[0], initialTeamMembers[1], initialTeamMembers[2]] },
  // Sales Tasks (teamId: 2)
  { id: 7, teamId: 2, title: 'پیگیری مشتریان بالقوه هفته', description: 'تماس با لیست مشتریان بالقوه جدید.', status: TaskStatus.ToDo, priority: TaskPriority.High, dueDate: '1402-09-28', assignedTo: [initialTeamMembers[4]] },
  { id: 8, teamId: 2, title: 'آماده‌سازی دموی محصول برای شرکت X', description: 'سفارشی‌سازی دمو بر اساس نیازهای مشتری.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '1402-09-29', assignedTo: [initialTeamMembers[3]] },
  { id: 9, teamId: 2, title: 'به‌روزرسانی CRM', description: 'وارد کردن اطلاعات جلسات اخیر.', status: TaskStatus.Done, priority: TaskPriority.Medium, dueDate: '1402-09-24', assignedTo: [initialTeamMembers[4]] },
  { id: 10, teamId: 2, title: 'شرکت در وبینار فروش', description: 'یادگیری تکنیک‌های جدید فروش.', status: TaskStatus.ToDo, priority: TaskPriority.Low, dueDate: '1402-10-05', assignedTo: [initialTeamMembers[3], initialTeamMembers[4]] },
];


const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
    let colorClasses = '';
    switch (priority) {
        case TaskPriority.High: colorClasses = 'bg-red-100 text-red-800'; break;
        case TaskPriority.Medium: colorClasses = 'bg-yellow-100 text-yellow-800'; break;
        case TaskPriority.Low: colorClasses = 'bg-blue-100 text-blue-800'; break;
    }
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${colorClasses}`}>{priority}</span>;
}

const TaskCard: React.FC<{ task: Task; onClick: () => void; onDragStart: (e: React.DragEvent<HTMLDivElement>) => void; }> = ({ task, onClick, onDragStart }) => (
    <div 
        className="bg-white p-4 rounded-lg shadow-sm border border-border-color cursor-pointer hover:shadow-md transition-shadow active:cursor-grabbing"
        onClick={onClick}
        draggable
        onDragStart={onDragStart}
    >
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-sm text-text-dark">{task.title}</h4>
            <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="flex -space-x-2">
                {task.assignedTo.map(member => (
                    <img key={member.id} src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-white" title={member.name} />
                ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-text-light">
                <CalendarIcon className="w-4 h-4" />
                <span>{task.dueDate}</span>
            </div>
        </div>
    </div>
);

const getIconAndColorForStatus = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.ToDo:
            return { icon: ClipboardListIcon, colorClass: 'border-primary', iconColorClass: 'text-primary' };
        case TaskStatus.InProgress:
            return { icon: InProgressIcon, colorClass: 'border-yellow-500', iconColorClass: 'text-yellow-500' };
        case TaskStatus.Done:
            return { icon: CheckCircleFilledIcon, colorClass: 'border-secondary', iconColorClass: 'text-secondary' };
        default:
             return { icon: ClipboardListIcon, colorClass: 'border-gray-400', iconColorClass: 'text-gray-400' };
    }
};

const TaskColumn: React.FC<{ 
    title: TaskStatus; 
    tasks: Task[];
    onAddTask: () => void;
    onEditTask: (task: Task) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ title, tasks, onAddTask, onEditTask, onDragStart, onDrop }) => {
    const [isOver, setIsOver] = useState(false);
    const { icon: StatusIcon, colorClass, iconColorClass } = getIconAndColorForStatus(title);

    return (
        <div 
            className={`flex-1 min-w-[300px] bg-background rounded-xl flex flex-col border-t-4 ${colorClass} transition-colors ${isOver ? 'bg-primary-light' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => { e.preventDefault(); onDrop(e); setIsOver(false); }}
        >
            <div className="flex justify-between items-center mb-4 px-4 pt-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <StatusIcon className={`w-6 h-6 ${iconColorClass}`} />
                    <h3 className="font-bold text-text-dark">{title}</h3>
                    <span className="text-sm font-semibold bg-gray-200 text-text-light w-6 h-6 flex items-center justify-center rounded-md">{tasks.length}</span>
                </div>
                <button className="text-text-light hover:text-primary" onClick={onAddTask}>
                    <PlusCircleIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-1 relative overflow-hidden px-2">
                <div className="absolute inset-0 overflow-y-auto px-2 space-y-3 pb-4">
                    {tasks.map(task => <TaskCard key={task.id} task={task} onClick={() => onEditTask(task)} onDragStart={(e) => onDragStart(e, task)} />)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
}

const TeamManagementPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [allMembers, setAllMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [newStatusForModal, setNewStatusForModal] = useState<TaskStatus>(TaskStatus.ToDo);
    
    const [activeTeamId, setActiveTeamId] = useState<number>(1);
    const [activeView, setActiveView] = useState<'board' | 'list'>('board');

    const currentTeam = useMemo(() => teams.find(t => t.id === activeTeamId), [activeTeamId, teams]);
    const currentTeamMembers = useMemo(() => allMembers.filter(member => currentTeam?.memberIds.includes(member.id)), [allMembers, currentTeam]);
    const currentTasks = useMemo(() => tasks.filter(t => t.teamId === activeTeamId), [tasks, activeTeamId]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
        e.dataTransfer.setData("taskId", task.id.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: TaskStatus) => {
        const taskId = parseInt(e.dataTransfer.getData("taskId"), 10);
        setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };
    
    const handleOpenCreateModal = (status: TaskStatus) => {
        setSelectedTask(null);
        setNewStatusForModal(status);
        setIsTaskModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const handleCloseTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTask(null);
    };

    const handleSaveTask = (taskToSave: Task) => {
        const taskExists = tasks.some(t => t.id === taskToSave.id);
        if (taskExists) {
            setTasks(tasks.map(t => t.id === taskToSave.id ? taskToSave : t));
        } else {
            setTasks(prevTasks => [...prevTasks, { ...taskToSave, teamId: activeTeamId }]);
        }
    };
    
    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };
    
    const handleSaveTeamsAndMembers = (updatedTeams: Team[], updatedMembers: TeamMember[]) => {
        setTeams(updatedTeams);
        setAllMembers(updatedMembers);
    }
    
    const handleUpdateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const columns: { title: TaskStatus }[] = [ { title: TaskStatus.ToDo }, { title: TaskStatus.InProgress }, { title: TaskStatus.Done } ];

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
            <div className="flex-shrink-0 mb-6">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-dark">مدیریت تیم</h1>
                        <p className="text-text-light mt-1">رهگیری وظایف و پروژه‌های تیم‌ها</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <button onClick={() => setIsManageModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white text-text-dark rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-border-color shadow-sm">
                           <UsersGroupIcon className="w-5 h-5" />
                           <span>مدیریت تیم‌ها و اعضا</span>
                       </button>
                       <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                           <button onClick={() => setActiveView('board')} className={`p-2 rounded-md transition-colors ${activeView === 'board' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}><BoardIcon className="w-5 h-5"/></button>
                           <button onClick={() => setActiveView('list')} className={`p-2 rounded-md transition-colors ${activeView === 'list' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}><ListIcon className="w-5 h-5"/></button>
                       </div>
                    </div>
                 </div>
            </div>
            
            <div className="flex-shrink-0 mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        {teams.map(team => (
                            <button
                                key={team.id}
                                onClick={() => setActiveTeamId(team.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${ activeTeamId === team.id ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark' }`}
                            >
                                {team.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text-dark">اعضای تیم:</span>
                        <div className="flex -space-x-2">
                             {currentTeamMembers.map(member => (
                                <img key={member.id} src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white" title={member.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {activeView === 'board' ? (
                <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
                    {columns.map(col => (
                        <TaskColumn 
                            key={col.title} 
                            title={col.title} 
                            tasks={currentTasks.filter(t => t.status === col.title)}
                            onAddTask={() => handleOpenCreateModal(col.title)}
                            onEditTask={handleOpenEditModal}
                            onDragStart={handleDragStart}
                            onDrop={(e) => handleDrop(e, col.title)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2">
                   <TaskListView tasks={currentTasks} onEditTask={handleOpenEditModal} onUpdateTaskStatus={handleUpdateTaskStatus} />
                </div>
            )}
            
            <TaskModal 
                isOpen={isTaskModalOpen}
                onClose={handleCloseTaskModal}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
                task={selectedTask}
                teamMembers={currentTeamMembers}
                defaultStatus={newStatusForModal}
            />
            <ManageTeamsModal 
                isOpen={isManageModalOpen}
                onClose={() => setIsManageModalOpen(false)}
                initialTeams={teams}
                initialMembers={allMembers}
                onSave={handleSaveTeamsAndMembers}
            />
        </div>
    );
};

export default TeamManagementPage;