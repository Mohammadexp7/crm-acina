import React, { useState, useEffect } from 'react';
import { Team, TeamMember } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ManageTeamsModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTeams: Team[];
    initialMembers: TeamMember[];
    onSave: (teams: Team[], members: TeamMember[]) => void;
}

const ManageTeamsModal: React.FC<ManageTeamsModalProps> = ({ isOpen, onClose, initialTeams, initialMembers, onSave }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

    const [newTeamName, setNewTeamName] = useState('');
    const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });

    useEffect(() => {
        if (isOpen) {
            setTeams(JSON.parse(JSON.stringify(initialTeams)));
            setMembers(JSON.parse(JSON.stringify(initialMembers)));
            setSelectedTeamId(initialTeams.length > 0 ? initialTeams[0].id : null);
        }
    }, [isOpen, initialTeams, initialMembers]);
    
    if (!isOpen) return null;

    const handleAddTeam = () => {
        if (!newTeamName.trim()) return;
        const newTeam: Team = {
            id: Date.now(),
            name: newTeamName,
            memberIds: [],
        };
        setTeams(prev => [...prev, newTeam]);
        setNewTeamName('');
    };
    
    const handleAddMember = () => {
        if (!newMember.name.trim() || !newMember.email.trim() || !newMember.role.trim()) return;
        const newMemberData: TeamMember = {
            id: Date.now(),
            ...newMember,
            avatar: `https://picsum.photos/seed/${Date.now()}/100`,
        };
        setMembers(prev => [...prev, newMemberData]);
        setNewMember({ name: '', email: '', role: '' });
    };
    
    const handleMemberAssignment = (memberId: number) => {
        if (!selectedTeamId) return;
        setTeams(prevTeams => prevTeams.map(team => {
            if (team.id === selectedTeamId) {
                const isMemberInTeam = team.memberIds.includes(memberId);
                const newMemberIds = isMemberInTeam 
                    ? team.memberIds.filter(id => id !== memberId) 
                    : [...team.memberIds, memberId];
                return { ...team, memberIds: newMemberIds };
            }
            return team;
        }));
    };

    const handleSaveChanges = () => {
        onSave(teams, members);
        onClose();
    };

    const selectedTeam = teams.find(t => t.id === selectedTeamId);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-color">
                    <h2 className="text-xl font-bold text-text-dark">مدیریت تیم‌ها و اعضا</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Teams Column */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-text-dark">تیم‌ها</h3>
                        <div className="space-y-2">
                           {teams.map(team => (
                               <button key={team.id} onClick={() => setSelectedTeamId(team.id)}
                                   className={`w-full text-right p-3 rounded-lg text-sm font-semibold transition-colors ${selectedTeamId === team.id ? 'bg-primary-light text-primary' : 'hover:bg-gray-100 text-text-dark'}`}>
                                   {team.name}
                               </button>
                           ))}
                        </div>
                        <div className="flex gap-2">
                            <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="نام تیم جدید..." className="flex-1 px-3 py-2 border border-border-color bg-background rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"/>
                            <button onClick={handleAddTeam} className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90">+</button>
                        </div>
                    </div>

                    {/* Members Assignment Column */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-text-dark">اختصاص اعضا به تیم "{selectedTeam?.name || ''}"</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {members.map(member => (
                                <div key={member.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
                                    <input type="checkbox" id={`member-${member.id}`} className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                                        checked={selectedTeam?.memberIds.includes(member.id) || false}
                                        onChange={() => handleMemberAssignment(member.id)}
                                        disabled={!selectedTeamId}
                                    />
                                    <label htmlFor={`member-${member.id}`} className="flex items-center gap-2 cursor-pointer">
                                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full"/>
                                        <span className="text-sm font-medium text-text-dark">{member.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                         {!selectedTeamId && <p className="text-sm text-text-light">یک تیم را برای اختصاص اعضا انتخاب کنید.</p>}
                    </div>

                    {/* Add Member Column */}
                    <div className="space-y-4 bg-background p-4 rounded-lg">
                        <h3 className="font-bold text-text-dark">افزودن عضو جدید به سازمان</h3>
                        <div className="space-y-3">
                            <input type="text" value={newMember.name} onChange={(e) => setNewMember(p=> ({...p, name: e.target.value}))} placeholder="نام کامل" className="w-full px-3 py-2 border border-border-color rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary" />
                            <input type="email" value={newMember.email} onChange={(e) => setNewMember(p=> ({...p, email: e.target.value}))} placeholder="ایمیل" className="w-full px-3 py-2 border border-border-color rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary" />
                            <input type="text" value={newMember.role} onChange={(e) => setNewMember(p=> ({...p, role: e.target.value}))} placeholder="سِمَت" className="w-full px-3 py-2 border border-border-color rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary" />
                            <button onClick={handleAddMember} className="w-full py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90">افزودن عضو</button>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-border-color flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-text-dark rounded-lg font-semibold hover:bg-gray-200 transition">بستن</button>
                    <button type="button" onClick={handleSaveChanges} className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">ذخیره تغییرات</button>
                </div>
            </div>
        </div>
    );
};

export default ManageTeamsModal;