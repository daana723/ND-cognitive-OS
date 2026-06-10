import { useStore } from '../../logic/useStore';

export default function Settings() {
  const profile = useStore((s) => s.profile);
  const cognitiveState = useStore((s) => s.cognitiveState);
  const emotionalLog = useStore((s) => s.emotionalLog);
  const sensoryLog = useStore((s) => s.sensoryLog);
  const discoveries = useStore((s) => s.discoveries);
  const sparkAssessmentResults = useStore((s) => s.sparkAssessmentResults);

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      profile,
      cognitiveState,
      emotionalLog,
      sensoryLog,
      discoveries,
      sparkAssessmentResults,
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nd-cognitive-os-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (confirm('⚠️ This will delete ALL your data. This cannot be undone. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleResetOnboarding = () => {
    useStore.setState({ showOnboarding: true });
  };

  const emotionalCount = emotionalLog.length;
  const sensoryCount = sensoryLog.length;
  const discoveryCount = discoveries.length;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your data and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <span className="text-indigo-400">◈</span> Profile
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Cognitive Style</label>
            <p className="text-gray-200 capitalize">{profile.cognitiveStyle || 'Not set'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Attention Pattern</label>
            <p className="text-gray-200 capitalize">{profile.attentionPattern?.replace(/_/g, ' ') || 'Not set'}</p>
          </div>
          {sparkAssessmentResults && (
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">SPARK Profile</label>
              <p className="text-gray-200">{sparkAssessmentResults.profileType}</p>
              <p className="text-xs text-indigo-300 mt-1">Index: {sparkAssessmentResults.sparkIndex.toFixed(1)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Data Summary */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <span className="text-violet-400">◆</span> Your Data
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-indigo-950/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-indigo-300">{emotionalCount}</div>
            <p className="text-xs text-gray-400">Emotional entries</p>
          </div>
          <div className="bg-indigo-950/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-violet-300">{sensoryCount}</div>
            <p className="text-xs text-gray-400">Sensory check-ins</p>
          </div>
          <div className="bg-indigo-950/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-300">{discoveryCount}</div>
            <p className="text-xs text-gray-400">Discoveries</p>
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <span className="text-emerald-400">▼</span> Export
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Download all your data as a JSON file. Includes profile, logs, and SPARK results.
        </p>
        <button onClick={handleExportJSON} className="btn-primary">
          Export as JSON
        </button>
      </div>

      {/* Danger Zone */}
      <div className="card border-l-4 border-rose-600/50">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <span className="text-rose-400">⚠️</span> Danger Zone
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-2">Reset Onboarding</h3>
            <p className="text-xs text-gray-400 mb-3">See the welcome sequence again.</p>
            <button onClick={handleResetOnboarding} className="btn-ghost text-sm">
              Reset Onboarding
            </button>
          </div>

          <div className="pt-4 border-t border-rose-900/30">
            <h3 className="text-sm font-semibold text-gray-200 mb-2">Delete All Data</h3>
            <p className="text-xs text-gray-400 mb-3">
              Permanently delete all your data. This cannot be undone.
            </p>
            <button onClick={handleClearAll} className="btn-danger text-sm">
              Clear All Data
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-indigo-950/20 rounded-lg text-center">
        <p className="text-xs text-gray-500">
          ND Cognitive OS v1.0 · All data stored locally · No tracking · No analytics
        </p>
      </div>
    </div>
  );
}
