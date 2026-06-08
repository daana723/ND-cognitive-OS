import { useStore } from '../../logic/useStore';

export default function PatternEngine() {
  const getPatterns = useStore((s) => s.getPatterns);
  const cognitiveMap = useStore((s) => s.getCognitiveMap);
  const profile = useStore((s) => s.profile);

  const patterns = getPatterns();
  const map = cognitiveMap();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-100 mb-1">Pattern Engine</h2>
        <p className="text-sm text-indigo-300/70">
          Detected patterns from your cognitive data
        </p>
      </div>

      {/* Empty State */}
      {patterns.isEmpty && (
        <section className="card text-center py-8">
          <p className="text-gray-500 text-sm">
            Not enough data yet. Use the system for a few days and patterns will emerge.
          </p>
        </section>
      )}

      {/* Warnings */}
      {patterns.warnings.length > 0 && (
        <section className="card border-amber-500/30 bg-amber-500/5">
          <h3 className="label mb-3 text-amber-300">⚠ Warnings</h3>
          <div className="space-y-2">
            {patterns.warnings.map((w, i) => (
              <p key={i} className="text-sm text-amber-200/80">{w}</p>
            ))}
          </div>
        </section>
      )}

      {/* Detected Patterns */}
      {patterns.patterns.length > 0 && (
        <section className="card">
          <h3 className="label mb-3">Detected Patterns</h3>
          <div className="space-y-4">
            {patterns.patterns.map((p, i) => (
              <div key={i} className="border-b border-indigo-900/20 pb-3 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 capitalize">
                    {p.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-200">{p.description}</p>
                {p.suggestion && (
                  <p className="text-sm text-indigo-300/70 mt-1">→ {p.suggestion}</p>
                )}
                {p.frequency && (
                  <p className="text-xs text-gray-500 mt-1">Frequency: {p.frequency}</p>
                )}
                {p.triggers && p.triggers.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {p.triggers.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 capitalize">
                        {t.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}
                {p.missing && p.missing.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Missing states:</p>
                    <div className="flex gap-1">
                      {p.missing.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 capitalize">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cognitive Map Data */}
      {!map.isEmpty && (
        <section className="card">
          <h3 className="label mb-3">Cognitive Map Data</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>{map.totalEntries} state transitions tracked</p>
            
            {Object.keys(map.stateFrequency).length > 0 && (
              <div>
                <p className="text-gray-500 text-xs mb-1">State Frequency:</p>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(map.stateFrequency).map(([state, count]) => (
                    <div key={state} className="flex justify-between text-xs">
                      <span className="capitalize text-gray-400">{state}</span>
                      <span className="text-gray-500">{count}x</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {map.topTransitions.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs mb-1">Common Transitions:</p>
                {map.topTransitions.map((t, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-400">{t.chain}</span>
                    <span className="text-gray-500">{t.count}x</span>
                  </div>
                ))}
              </div>
            )}

            {map.insights.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs mb-1">Insights:</p>
                {map.insights.map((insight, i) => (
                  <p key={i} className="text-indigo-300/80">• {insight}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Profile Summary */}
      <section className="card">
        <h3 className="label mb-3">Profile Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Style:</span>
            <span className="text-gray-300 ml-2 capitalize">{profile.cognitiveStyle}</span>
          </div>
          <div>
            <span className="text-gray-500">Attention:</span>
            <span className="text-gray-300 ml-2 capitalize">{profile.attentionPattern?.replace(/_/g, ' ')}</span>
          </div>
          <div>
            <span className="text-gray-500">Strengths:</span>
            <span className="text-gray-300 ml-2">{profile.strengths?.length || 0} recorded</span>
          </div>
          <div>
            <span className="text-gray-500">Challenges:</span>
            <span className="text-gray-300 ml-2">{profile.challenges?.length || 0} recorded</span>
          </div>
        </div>
      </section>
    </div>
  );
}
