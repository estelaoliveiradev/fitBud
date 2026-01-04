
import React, { useState, useEffect, useCallback } from 'react';
import { Workout, UserProgress, Friend, AvatarConfig } from './types';
import { Avatar } from './components/Avatar';
import { getWorkoutMotivation, suggestNextWorkout } from './services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock Initial Data
const INITIAL_AVATAR: AvatarConfig = {
  bodyColor: '#10b981',
  accessory: 'none',
  expression: 'happy'
};

const INITIAL_PROGRESS: UserProgress = {
  level: 5,
  experience: 450,
  streak: 3,
  totalWorkouts: 12,
  avatarConfig: INITIAL_AVATAR
};

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Lucas', level: 12, lastWorkout: 'Peito e Tríceps', avatarConfig: { bodyColor: '#3b82f6', accessory: 'headband', expression: 'determined' } },
  { id: '2', name: 'Ana', level: 8, lastWorkout: 'Yoga', avatarConfig: { bodyColor: '#ec4899', accessory: 'cape', expression: 'happy' } },
  { id: '3', name: 'Pedro', level: 15, lastWorkout: 'Corrida 10km', avatarConfig: { bodyColor: '#f59e0b', accessory: 'dumbbells', expression: 'determined' } },
];

const MOCK_HISTORY = [
  { date: '01/10', calories: 300 },
  { date: '02/10', calories: 450 },
  { date: '03/10', calories: 200 },
  { date: '04/10', calories: 600 },
  { date: '05/10', calories: 500 },
  { date: '06/10', calories: 750 },
];

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [motivation, setMotivation] = useState<string>("Carregando motivação...");
  const [suggestion, setSuggestion] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workout' | 'social'>('dashboard');
  const [workoutInput, setWorkoutInput] = useState({ type: '', duration: 30 });

  const fetchAIContent = useCallback(async () => {
    const mot = await getWorkoutMotivation("Guerreiro", progress.level, "Musculação");
    setMotivation(mot);
    const sug = await suggestNextWorkout("Musculação, Corrida, Yoga");
    setSuggestion(sug);
  }, [progress.level]);

  useEffect(() => {
    fetchAIContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogWorkout = () => {
    if (!workoutInput.type) return;
    
    // Level up logic
    const newWorkouts = progress.totalWorkouts + 1;
    const newLevel = Math.floor(newWorkouts / 3) + 1;
    
    // Update expression based on effort
    const newExpression = workoutInput.duration > 45 ? 'exhausted' : 'determined';

    setProgress(prev => ({
      ...prev,
      totalWorkouts: newWorkouts,
      level: newLevel,
      streak: prev.streak + 1,
      avatarConfig: {
        ...prev.avatarConfig,
        expression: newExpression,
        accessory: newLevel > 10 ? 'dumbbells' : prev.avatarConfig.accessory
      }
    }));

    setWorkoutInput({ type: '', duration: 30 });
    alert("Treino registrado! Seu bonequinho ganhou XP!");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-20">
      {/* Navigation - Sidebar for desktop, Bottom bar for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:left-0 md:w-20 md:h-screen glass z-50 flex md:flex-col items-center justify-around md:justify-center gap-8 p-4">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'text-slate-400 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button 
          onClick={() => setActiveTab('workout')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'workout' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'text-slate-400 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          onClick={() => setActiveTab('social')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'social' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'text-slate-400 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 pt-10">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Olá, <span className="gradient-text">Guerreiro!</span>
            </h1>
            <p className="text-slate-400 mt-1 italic">"{motivation}"</p>
          </div>
          <div className="flex gap-4">
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
              <span className="text-orange-500">🔥</span>
              <span className="font-bold">{progress.streak} dias de sequência</span>
            </div>
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
              <span className="text-blue-500">⭐</span>
              <span className="font-bold">Nível {progress.level}</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <section className="lg:col-span-1 glass rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="white" fillOpacity="0.1" />
                 </svg>
               </div>
               <h2 className="text-xl font-bold mb-4 self-start">Seu Bonequinho</h2>
               <Avatar config={progress.avatarConfig} size={250} level={progress.level} />
               <div className="mt-8 w-full">
                 <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Progresso XP</span>
                    <span className="font-bold text-emerald-400">75%</span>
                 </div>
                 <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-3/4 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
               </div>
            </section>

            {/* Stats & Charts */}
            <section className="lg:col-span-2 space-y-8">
              <div className="glass rounded-3xl p-6 h-64">
                <h3 className="text-lg font-semibold mb-4">Queima de Calorias (Últimos 7 dias)</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={MOCK_HISTORY}>
                    <defs>
                      <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="calories" stroke="#10b981" fillOpacity={1} fill="url(#colorCal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass rounded-3xl p-6 border-l-4 border-emerald-500">
                  <p className="text-slate-400 text-sm">Dica do Coach AI</p>
                  <p className="text-lg font-medium mt-2">{suggestion || "Analisando seu ritmo..."}</p>
                </div>
                <div className="glass rounded-3xl p-6 border-l-4 border-blue-500">
                  <p className="text-slate-400 text-sm">Total de Treinos</p>
                  <p className="text-3xl font-bold mt-2">{progress.totalWorkouts}</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="max-w-2xl mx-auto glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Registrar Novo Treino</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 mb-2">Tipo de Exercício</label>
                <input 
                  type="text" 
                  value={workoutInput.type}
                  onChange={(e) => setWorkoutInput({...workoutInput, type: e.target.value})}
                  placeholder="Ex: Musculação, Corrida, Natação..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-2">Duração (minutos)</label>
                <input 
                  type="number" 
                  value={workoutInput.duration}
                  onChange={(e) => setWorkoutInput({...workoutInput, duration: parseInt(e.target.value)})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <button 
                onClick={handleLogWorkout}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                Finalizar e Ganhar XP
              </button>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Ranking de Amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_FRIENDS.map(friend => (
                <div key={friend.id} className="glass rounded-3xl p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                  <Avatar config={friend.avatarConfig} size={100} level={friend.level} />
                  <h3 className="text-xl font-bold mt-4">{friend.name}</h3>
                  <p className="text-emerald-400 text-sm font-semibold">Nível {friend.level}</p>
                  <p className="text-slate-400 text-xs mt-2 italic">Último: {friend.lastWorkout}</p>
                  <button className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors">
                    Ver Perfil
                  </button>
                </div>
              ))}
            </div>
            
            <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-700">
               <p className="text-slate-400 mb-4">Que tal chamar mais gente pro grupo?</p>
               <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                 Convidar Amigos
               </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
