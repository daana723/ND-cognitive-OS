import { useStore } from '../../logic/useStore';
import { STATES, ENERGY_LEVELS, SENSORY_LEVELS } from '../../logic/stateMachine';

const STATE_COLORS = {
  flow: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  focused: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  scattered: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  overwhelmed: 'bg-red-500/20 text-red-300 border-red-500/30',
  recovering: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  dormant: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  hyperfocus: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  dissociated: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
};

const ENERGY_ICONS = {
  high: '⚡',
  medium: '◈',
  low: '◇',
  depleted: '○',
};

export default function Dashboard() {
  const state = useStore((s) => s.cognitiveState);
  const profile = useStore((s) => s.profile);
  const changeState = useStore((s) => s.changeState);
  const updateEnergy = useStore((s) => s.updateEnergy);
  const updateSensory = useStore((s) => s.updateSensory);
  const getCognitiveMap = useStore((s) => s.getCognitiveMap);
  const getPatterns = useStore((s) => s.getPatterns);
  const getRecommendations = useStore((s) => s.getRecommendations);
  const getSparkTranslation = useStore((s) => s.getSparkTranslation);
  const setActiveModule = useStore((s) => s.setActiveModule);

  const map = getCognitiveMap();
  const patterns = getPatterns();
  const recommendations = getRecommendations();
  const spark = getSparkTranslation();

  return (
    <div className="space-y-6">
      {/* SPARK Profile — the assessment translated into how you work */}
      {spark ? (
        <section className="card border-t-4 border-indigo-500">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="label">Your SPARK Profile</h3>
              <p className="text-lg font-semibold text-indigo-300">{spark.profileType}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-100">{spark.sparkIndex.toFixed(1)}</div>
              <div className="text-xs text-gray-500">Index / 20</div>
            </div>
          </div>
          {spark.topStrengths.length > 0 && (
            <ul className="space-y-1 mb-3">
              {spark.topStrengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-indigo-400">◆</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setActiveModule('sparkResults')}
            className="text-sm text-indigo-300 hover:text-indigo-200"
          >
            View full profile →
          </button>
        </section>
      ) : (
        <section className="card border-t-4 border-indigo-500/40">
          <h3 className="label mb-1">Your SPARK Profile</h3>
          <p className="text-sm text-gray-400 mb-3">
            Take the assessment to translate how your mind works into your strengths and the conditions you need.
          </p>
          <button onClick={() => setActiveModule('spark')} className="btn-primary text-sm">
            Take the SPARK Assessment
          </button>
        </section>
      )}

      {/* Current State */}
      <section>
        <h2 className="text-lg font-medium text-gray-100 mb-3">Current State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(STATES).map((s) => (
            <button
              key={s}
              onClick={() => changeState(s)}
              className={`px-3 py-2 rounded-xl text-sm capitalize border transition-all ${
                state.current === s
                  ? STATE_COLORS[s] + ' ring-1 ring-indigo-400/50'
                  : 'bg-arcane-muted/50 text-gray-400 border-indigo-900/20 hover:border-indigo-700/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Energy & Sensory */}
      <section className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 className="label mb-2">Energy</h3>
          <div className="flex gap-2">
            {Object.values(ENERGY_LEVELS).map((level) => (
              <button
                key={level}
                onClick={() => updateEnergy(level)}
                className={`flex-1 py-2 rounded-lg text-xs capitalize transition-all ${
                  state.energy === level
                    ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                    : 'bg-arcane-dark/50 text-gray-500 hover:text-gray-300'
                }`}
              >
                {ENERGY_ICONS[level]} {level}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="label mb-2">Sensory Load</h3>
          <div className="flex gap-2">
            {Object.values(SENSORY_LEVELS).map((level) => (
              <button
                key={level}
                onClick={() => updateSensory(level)}
                className={`flex-1 py-2 rounded-lg text-xs capitalize transition-all ${
                  state.sensory === level
                    ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                    : 'bg-arcane-dark/50 text-gray-500 hover:text-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cognitive Map Summary */}
      {!map.isEmpty && (
        <section className="card">
          <h3 className="label mb-2">Cognitive Map</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>{map.totalEntries} state transitions tracked</p>
            {map.insights.map((insight, i) => (
              <p key={i} className="text-indigo-300/80">• {insight}</p>
            ))}
          </div>
        </section>
      )}

      {/* Pattern Warnings */}
      {patterns.warnings.length > 0 && (
        <section className="card border-amber-500/30">
          <h3 className="label mb-2 text-amber-300">⚠ Patterns</h3>
          <div className="space-y-2">
            {patterns.warnings.map((w, i) => (
              <p key={i} className="text-sm text-amber-200/80">{w}</p>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="card">
          <h3 className="label mb-2">Guidance</h3>
          <ul className="space-y-1">
            {recommendations.map((r, i) => (
              <li key={i} className="text-sm text-gray-300">→ {r}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Profile Summary */}
      <section className="card">
        <h3 className="label mb-2">Profile</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Style:</span>
            <span className="text-gray-300 ml-2 capitalize">{profile.cognitiveStyle}</span>
          </div>
          <div>
            <span className="text-gray-500">Attention:</span>
            <span className="text-gray-300 ml-2 capitalize">{profile.attentionPattern?.replace(/_/g, ' ')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
