import { useState } from 'react';
import { useStore } from '../../logic/useStore';

const SENSORY_CHANNELS = [
  { id: 'visual', label: 'Visual', icon: '👁', desc: 'Light, movement, clutter' },
  { id: 'auditory', label: 'Auditory', icon: '👂', desc: 'Noise, voices, music' },
  { id: 'tactile', label: 'Tactile', icon: '✋', desc: 'Texture, temperature, clothing' },
  { id: 'proprioceptive', label: 'Body', icon: '🧍', desc: 'Movement, pressure, position' },
  { id: 'interoceptive', label: 'Internal', icon: '💓', desc: 'Hunger, heartbeat, breath' },
];

const ENV_FACTORS = [
  { id: 'lighting', label: 'Lighting' },
  { id: 'noise', label: 'Noise level' },
  { id: 'temperature', label: 'Temperature' },
  { id: 'space', label: 'Space/Clutter' },
  { id: 'people', label: 'People nearby' },
];

export default function SensoryCheckIn() {
  const logSensoryState = useStore((s) => s.logSensoryState);
  const sensoryLog = useStore((s) => s.sensoryLog);
  const [levels, setLevels] = useState({});
  const [environment, setEnvironment] = useState({});
  const [notes, setNotes] = useState('');

  const handleLog = () => {
    logSensoryState({ levels, environment, notes: notes.trim() });
    setLevels({});
    setEnvironment({});
    setNotes('');
  };

  const recent = sensoryLog.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-100 mb-1">Sensory Check-In</h2>
        <p className="text-sm text-indigo-300/70">Track your sensory load and environment</p>
      </div>

      {/* Sensory Channels */}
      <section className="card">
        <h3 className="label mb-3">Sensory Load by Channel</h3>
        <div className="space-y-3">
          {SENSORY_CHANNELS.map((ch) => (
            <div key={ch.id} className="flex items-center gap-3">
              <span className="text-lg w-8">{ch.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{ch.label}</span>
                  <span className="text-gray-500 text-xs">{ch.desc}</span>
                </div>
                <div className="flex gap-1">
                  {['low', 'moderate', 'high', 'overload'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setLevels({ ...levels, [ch.id]: level })}
                      className={`flex-1 py-1 rounded text-xs capitalize transition-all ${
                        levels[ch.id] === level
                          ? level === 'overload' ? 'bg-red-500/30 text-red-300'
                            : level === 'high' ? 'bg-amber-500/30 text-amber-300'
                            : level === 'moderate' ? 'bg-blue-500/30 text-blue-300'
                            : 'bg-emerald-500/30 text-emerald-300'
                          : 'bg-arcane-dark/50 text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Environment */}
      <section className="card">
        <h3 className="label mb-3">Environment</h3>
        <div className="grid grid-cols-2 gap-3">
          {ENV_FACTORS.map((f) => (
            <div key={f.id}>
              <label className="text-xs text-gray-400 mb-1 block">{f.label}</label>
              <select
                value={environment[f.id] || ''}
                onChange={(e) => setEnvironment({ ...environment, [f.id]: e.target.value })}
                className="input w-full text-sm"
              >
                <option value="">—</option>
                <option value="calm">Calm</option>
                <option value="moderate">Moderate</option>
                <option value="intense">Intense</option>
                <option value="overwhelming">Overwhelming</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="card">
        <label className="label">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything notable about your sensory state..."
          className="input w-full h-20 resize-none"
        />
        <button onClick={handleLog} className="btn-primary w-full mt-3">Log Check-In</button>
      </section>

      {/* Recent */}
      {recent.length > 0 && (
        <section className="card">
          <h3 className="label mb-3">Recent Check-Ins</h3>
          <div className="space-y-3">
            {recent.map((entry) => (
              <div key={entry.id} className="text-sm border-b border-indigo-900/20 pb-2">
                <span className="text-gray-400 text-xs">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(entry.levels || {}).map(([ch, level]) => (
                    <span key={ch} className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/30 text-indigo-300">
                      {ch}: {level}
                    </span>
                  ))}
                </div>
                {entry.notes && <p className="text-gray-400 mt-1 text-xs">{entry.notes}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
