import { useState } from 'react';
import { useStore } from '../../logic/useStore';

const EMOTIONS = [
  { id: 'calm', label: 'Calm', color: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'anxious', label: 'Anxious', color: 'bg-amber-500/20 text-amber-300' },
  { id: 'frustrated', label: 'Frustrated', color: 'bg-red-500/20 text-red-300' },
  { id: 'excited', label: 'Excited', color: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'sad', label: 'Sad', color: 'bg-blue-500/20 text-blue-300' },
  { id: 'angry', label: 'Angry', color: 'bg-rose-500/20 text-rose-300' },
  { id: 'hopeful', label: 'Hopeful', color: 'bg-green-500/20 text-green-300' },
  { id: 'numb', label: 'Numb', color: 'bg-gray-500/20 text-gray-400' },
  { id: 'overwhelmed', label: 'Overwhelmed', color: 'bg-purple-500/20 text-purple-300' },
  { id: 'content', label: 'Content', color: 'bg-teal-500/20 text-teal-300' },
];

export default function EmotionalNavigator() {
  const logEmotionalState = useStore((s) => s.logEmotionalState);
  const emotionalLog = useStore((s) => s.emotionalLog);
  const [selected, setSelected] = useState(null);
  const [trigger, setTrigger] = useState('');
  const [strategy, setStrategy] = useState('');
  const [intensity, setIntensity] = useState(5);

  const handleLog = () => {
    if (!selected) return;
    logEmotionalState({
      emotion: selected,
      trigger: trigger.trim(),
      strategy: strategy.trim(),
      intensity,
    });
    setSelected(null);
    setTrigger('');
    setStrategy('');
    setIntensity(5);
  };

  const recent = emotionalLog.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-100 mb-1">Emotional Navigator</h2>
        <p className="text-sm text-indigo-300/70">Track your emotional states and triggers</p>
      </div>

      {/* Emotion Selector */}
      <section className="card">
        <h3 className="label mb-3">How are you feeling?</h3>
        <div className="flex flex-wrap gap-2">
          {EMOTIONS.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id)}
              className={`px-3 py-1.5 rounded-full text-sm capitalize transition-all ${
                selected === e.id
                  ? e.color + ' ring-2 ring-indigo-400/50'
                  : 'bg-arcane-dark/50 text-gray-400 hover:text-gray-200'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </section>

      {/* Details */}
      {selected && (
        <section className="card space-y-4">
          <div>
            <label className="label">What triggered this? (optional)</label>
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="e.g., sudden noise, task switch, memory..."
              className="input w-full"
            />
          </div>

          <div>
            <label className="label">What helped or might help?</label>
            <input
              type="text"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="e.g., deep breath, walk, music..."
              className="input w-full"
            />
          </div>

          <div>
            <label className="label">Intensity: {intensity}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <button onClick={handleLog} className="btn-primary w-full">Log Entry</button>
        </section>
      )}

      {/* Recent Entries */}
      {recent.length > 0 && (
        <section className="card">
          <h3 className="label mb-3">Recent Entries</h3>
          <div className="space-y-3">
            {recent.map((entry) => {
              const emotion = EMOTIONS.find((e) => e.id === entry.emotion);
              return (
                <div key={entry.id} className="flex items-start gap-3 text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${emotion?.color || 'bg-gray-500/20 text-gray-400'}`}>
                    {entry.emotion}
                  </span>
                  <div className="flex-1">
                    <div className="flex gap-2 text-gray-400 text-xs">
                      <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                      <span>Intensity: {entry.intensity}/10</span>
                    </div>
                    {entry.trigger && <p className="text-gray-300 mt-1">Trigger: {entry.trigger}</p>}
                    {entry.strategy && <p className="text-indigo-300/70">Strategy: {entry.strategy}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
