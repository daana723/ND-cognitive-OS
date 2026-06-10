import { useStore } from '../../logic/useStore';

export default function Landing() {
  const setActiveModule = useStore((s) => s.setActiveModule);
  const profile = useStore((s) => s.profile);
  const sparkResults = useStore((s) => s.sparkAssessmentResults);

  const handleStartSPARK = () => {
    setActiveModule('spark');
  };

  const handleStartCognitive = () => {
    setActiveModule('dashboard');
  };

  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 text-6xl">◈</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-4">
            ND Cognitive OS
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
            Cognitive infrastructure for neurodivergent minds.
          </p>
          <p className="text-indigo-300/70">This is not productivity software. This is self-knowledge.</p>
        </div>

        {/* Main CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* SPARK Assessment Card */}
          <div className="card hover:border-indigo-500 transition-all cursor-pointer group" onClick={handleStartSPARK}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-4xl mb-3">◉</div>
                <h2 className="text-2xl font-bold text-gray-100">2E SPARK Assessment</h2>
                <p className="text-sm text-indigo-300 mt-1">Know your cognitive intensity</p>
              </div>
              {sparkResults && (
                <div className="bg-indigo-950/40 px-3 py-1 rounded-full text-xs text-indigo-300">
                  Completed
                </div>
              )}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Dabrowski-based assessment measuring five dimensions of 2E intensity:
              Cognitive, Emotional, Sensory, Creative, and Existential.
            </p>

            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-indigo-500">◆</span> 40 carefully designed questions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500">◆</span> 8–12 minutes to complete
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500">◆</span> Radar chart visualization
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500">◆</span> Your unique SPARK profile
              </li>
            </ul>

            <button className="btn-primary w-full group-hover:bg-indigo-700 transition-all">
              {sparkResults ? 'View Results' : 'Take Assessment'}
            </button>
          </div>

          {/* Cognitive OS Card */}
          <div className="card hover:border-violet-500 transition-all cursor-pointer group" onClick={handleStartCognitive}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-4xl mb-3">▲</div>
                <h2 className="text-2xl font-bold text-gray-100">Cognitive OS</h2>
                <p className="text-sm text-violet-300 mt-1">Daily infrastructure</p>
              </div>
              {profile.cognitiveStyle && (
                <div className="bg-violet-950/40 px-3 py-1 rounded-full text-xs text-violet-300">
                  Set up
                </div>
              )}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Track your emotional and sensory states, capture discoveries, and detect patterns
              in how you think, regulate, and create.
            </p>

            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-violet-500">◆</span> Emotional Navigator — track triggers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-violet-500">◆</span> Sensory Check-In — monitor load
              </li>
              <li className="flex items-center gap-2">
                <span className="text-violet-500">◆</span> Pattern Engine — see what emerges
              </li>
              <li className="flex items-center gap-2">
                <span className="text-violet-500">◆</span> Recommendations — context-aware guidance
              </li>
            </ul>

            <button className="btn-primary w-full group-hover:bg-violet-700 transition-all">
              {profile.cognitiveStyle ? 'Continue' : 'Get Started'}
            </button>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="card mb-12 border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">What This Is</h3>
          <div className="space-y-4 text-gray-300 text-sm">
            <p>
              <strong>Not therapy.</strong> Not coaching. Not yet another productivity app with
              dopamine hits and guilt.
            </p>
            <p>
              <strong>Infrastructure.</strong> A place where neurodivergent minds can build a cognitive map,
              understand your rhythms, honor your intensity, and make choices that fit how you actually work.
            </p>
            <p>
              <strong>Private.</strong> Everything stays on your machine. No tracking. No cloud. No surveillance.
              Your data belongs to you.
            </p>
            <p>
              <strong>Built for 2E.</strong> Twice-exceptional (gifted + neurodivergent) minds are the focus.
              You feel things deeper, think more complexly, and need systems that get it.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-950/20 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">◈</div>
            <p className="text-xs text-gray-400">Profile</p>
          </div>
          <div className="bg-indigo-950/20 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">◆</div>
            <p className="text-xs text-gray-400">SPARK Results</p>
          </div>
          <div className="bg-indigo-950/20 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">▼</div>
            <p className="text-xs text-gray-400">Data Export</p>
          </div>
          <div className="bg-indigo-950/20 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="text-xs text-gray-400">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
