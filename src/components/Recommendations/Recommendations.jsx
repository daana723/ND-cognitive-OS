import { useState } from 'react';
import { useStore } from '../../logic/useStore';
import { cognitiveStyles, attentionPatterns } from '../../logic/cognitiveMap';

export default function Recommendations() {
  const profile = useStore((s) => s.profile);
  const updateProfile = useStore((s) => s.updateProfile);
  const getRecommendations = useStore((s) => s.getRecommendations);
  const cognitiveMap = useStore((s) => s.getCognitiveMap);

  const recommendations = getRecommendations();
  const map = cognitiveMap();
  const { cognitiveStyle, attentionPattern, strengths = [], challenges = [], flowConditions = [], recoveryStrategies = [] } = profile;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-100 mb-1">Personal OS</h2>
        <p className="text-sm text-indigo-300/70">
          Recommendations based on your cognitive profile and patterns
        </p>
      </div>

      {/* Live Recommendations */}
      {recommendations.length > 0 && (
        <section className="card border-indigo-500/20">
          <h3 className="label mb-3">Current Guidance</h3>
          <ul className="space-y-2">
            {recommendations.map((r, i) => (
              <li key={i} className="text-sm text-gray-200 flex gap-2">
                <span className="text-indigo-400">→</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Profile Configuration */}
      <section className="card">
        <h3 className="label mb-3">Cognitive Profile</h3>
        
        <div className="space-y-4">
          <div>
            <label className="label">Thinking Style</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(cognitiveStyles).map(([key, val]) => (
                <button
                  key={val}
                  onClick={() => updateProfile({ cognitiveStyle: val })}
                  className={`px-3 py-2 rounded-xl text-sm capitalize transition-all ${
                    cognitiveStyle === val
                      ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                      : 'bg-arcane-dark/50 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {key.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Attention Pattern</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(attentionPatterns).map(([key, val]) => (
                <button
                  key={val}
                  onClick={() => updateProfile({ attentionPattern: val })}
                  className={`px-3 py-2 rounded-xl text-sm capitalize transition-all ${
                    attentionPattern === val
                      ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                      : 'bg-arcane-dark/50 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {key.replace(/_/g, ' ').toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Challenges */}
      <div className="grid grid-cols-2 gap-4">
        <TagSection
          label="Strengths"
          items={strengths}
          onAdd={(v) => updateProfile({ strengths: [...strengths, v] })}
          color="emerald"
        />
        <TagSection
          label="Challenges"
          items={challenges}
          onAdd={(v) => updateProfile({ challenges: [...challenges, v] })}
          color="amber"
        />
      </div>

      {/* Flow & Recovery */}
      <div className="grid grid-cols-2 gap-4">
        <TagSection
          label="Flow Conditions"
          items={flowConditions}
          onAdd={(v) => updateProfile({ flowConditions: [...flowConditions, v] })}
          color="cyan"
        />
        <TagSection
          label="Recovery Strategies"
          items={recoveryStrategies}
          onAdd={(v) => updateProfile({ recoveryStrategies: [...recoveryStrategies, v] })}
          color="purple"
        />
      </div>

      {/* Map Summary */}
      {!map.isEmpty && (
        <section className="card">
          <h3 className="label mb-3">Map Summary</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>{map.totalEntries} transitions tracked</p>
            {Object.entries(map.stateFrequency).map(([state, count]) => (
              <div key={state} className="flex justify-between">
                <span className="capitalize">{state}</span>
                <span className="text-gray-500">{count}x</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TagSection({ label, items, onAdd, color }) {
  const [val, setVal] = useState('');
  
  const colors = {
    emerald: 'bg-emerald-500/20 text-emerald-300',
    amber: 'bg-amber-500/20 text-amber-300',
    cyan: 'bg-cyan-500/20 text-cyan-300',
    purple: 'bg-purple-500/20 text-purple-300',
  };

  const handleAdd = () => {
    if (val.trim()) {
      onAdd(val.trim());
      setVal('');
    }
  };

  return (
    <section className="card">
      <h3 className="label mb-2">{label}</h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {items.map((item, i) => (
          <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${colors[color]}`}>
            {item}
          </span>
        ))}
        {items.length === 0 && (
          <span className="text-xs text-gray-600">None yet</span>
        )}
      </div>
      <div className="flex gap-1">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add..."
          className="input flex-1 text-xs py-1"
        />
        <button onClick={handleAdd} className="btn-primary text-xs py-1 px-2">+</button>
      </div>
    </section>
  );
}

