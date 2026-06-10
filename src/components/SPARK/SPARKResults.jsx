import { useState } from 'react';
import { useStore } from '../../logic/useStore';

const DIMENSIONS = {
  CI: { name: 'Cognitive Intensity', icon: '▲', color: '#4F46E5' },
  ER: { name: 'Emotional Resonance', icon: '●', color: '#E11D48' },
  SA: { name: 'Sensory Amplification', icon: '✱', color: '#D97706' },
  CD: { name: 'Creative Divergence', icon: '◆', color: '#7C3AED' },
  ED: { name: 'Existential Drive', icon: '◉', color: '#2563EB' },
};

const PROFILE_DESCRIPTIONS = {
  'The Quiet Spark': {
    range: '0–6',
    description: 'Your 2E traits are present but subtle. You may feel different without fully understanding why. Your journey is one of awakening—recognizing the depth and intensity you carry.',
    strength: 'You navigate the world with grace. Your stability is an asset.',
    growth: 'Give yourself permission to honor your sensitivity and depth.',
  },
  'The Flickering Spark': {
    range: '7–12',
    description: 'Your intensity shows up in waves. You experience the world deeply but may struggle with consistency or feel misunderstood. This is the profile of becoming.',
    strength: 'Your ability to shift between modes is a gift. You can read the room and adapt.',
    growth: 'Stop dimming your light to fit in. Your authentic expression matters.',
  },
  'The Burning Spark': {
    range: '13–16',
    description: 'You are clearly 2E. Your intensity is constant, beautiful, and demanding. You need systems and community built for people like you.',
    strength: 'Your passion, insight, and depth are extraordinary. You see what others miss.',
    growth: 'Build ND-friendly structures. Find people who get it. You don\'t have to burn out.',
  },
  'The Wildfire': {
    range: '17–20',
    description: 'You are in Dabrowski\'s territory—profound disintegration and transformation. You experience life at an intensity most cannot comprehend. This is the profile of the visionary.',
    strength: 'You are a catalyst. Your presence transforms everything it touches.',
    growth: 'Learn to ground yourself. Your intensity is a superpower, but you need protection and witness.',
  },
};

function RadarChart({ data, size = 300 }) {
  const radius = size / 2;
  const center = radius;
  const maxValue = 4;
  const levels = 4;

  const angleSlice = (Math.PI * 2) / 5;
  const dims = Object.keys(DIMENSIONS);

  // Generate circle paths
  const circles = [];
  for (let i = 1; i <= levels; i++) {
    const r = (radius * i) / levels;
    circles.push(
      <circle
        key={`circle-${i}`}
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
      />
    );
  }

  // Generate axis lines
  const lines = dims.map((dim, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return (
      <line
        key={`line-${i}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke="#475569"
        strokeWidth="1"
      />
    );
  });

  // Generate data polygon
  const points = dims.map((dim, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const val = (data[dim] / maxValue) * radius;
    return [center + val * Math.cos(angle), center + val * Math.sin(angle)];
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';

  // Generate labels
  const labels = dims.map((dim, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const labelDist = radius + 35;
    const x = center + labelDist * Math.cos(angle);
    const y = center + labelDist * Math.sin(angle);

    return (
      <text
        key={`label-${i}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium fill-gray-300"
      >
        {dim}
      </text>
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {circles}
      {lines}
      <path d={pathData} fill="#4F46E5" fillOpacity="0.2" stroke="#4F46E5" strokeWidth="2" />
      {points.map((p, i) => (
        <circle
          key={`point-${i}`}
          cx={p[0]}
          cy={p[1]}
          r="4"
          fill="#4F46E5"
          stroke="#1E293B"
          strokeWidth="2"
        />
      ))}
      {labels}
    </svg>
  );
}

export default function SPARKResults() {
  const results = useStore((s) => s.sparkAssessmentResults);
  const setActiveModule = useStore((s) => s.setActiveModule);
  const [showDetails, setShowDetails] = useState(false);

  if (!results) {
    return (
      <div className="min-h-screen bg-arcane-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No results to display. Take the assessment first.</p>
        </div>
      </div>
    );
  }

  const { results: dimScores, sparkIndex, profileType } = results;
  const profile = PROFILE_DESCRIPTIONS[profileType];

  return (
    <div className="min-h-screen bg-arcane-dark py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Your SPARK Profile</h1>
          <p className="text-gray-400">2E Assessment Results</p>
        </div>

        {/* Spark Index */}
        <div className="card mb-8 text-center border-t-4 border-indigo-500">
          <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
            {sparkIndex.toFixed(1)}
          </div>
          <div className="text-gray-300 mb-4">SPARK Index (0–20)</div>
          <div className="inline-block bg-indigo-950/40 px-4 py-2 rounded-lg">
            <p className="text-lg font-semibold text-indigo-300">{profileType}</p>
            <p className="text-xs text-gray-400 mt-1">Range: {profile.range}</p>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-100 mb-6">Dimension Profile</h2>
          <RadarChart data={dimScores} size={400} />
        </div>

        {/* Dimension Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(dimScores).map(([dim, score]) => (
            <div key={dim} className="bg-indigo-950/20 rounded-lg p-4 border-l-4 border-indigo-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" style={{ color: DIMENSIONS[dim].color }}>
                  {DIMENSIONS[dim].icon}
                </span>
                <span className="font-medium text-gray-200">{DIMENSIONS[dim].name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-100">{score.toFixed(1)}</span>
                <span className="text-xs text-gray-400">/ 4.0</span>
              </div>
              <div className="w-full bg-indigo-950/40 rounded-full h-2 mt-3">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(score / 4) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Profile Description */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Your Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4">{profile.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-indigo-900/40">
            <div>
              <h3 className="text-sm font-semibold text-indigo-300 mb-2">Your Strength</h3>
              <p className="text-sm text-gray-300">{profile.strength}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-violet-300 mb-2">Your Growth</h3>
              <p className="text-sm text-gray-300">{profile.growth}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-ghost"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={() => setActiveModule('dashboard')}
            className="btn-primary"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Detailed Interpretation */}
        {showDetails && (
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Deep Interpretation</h3>
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Your SPARK Index measures the intensity of 2E (Twice Exceptional) traits across five dimensions:
              </p>
              <ul className="space-y-2">
                {Object.entries(DIMENSIONS).map(([dim, info]) => (
                  <li key={dim} className="flex gap-3">
                    <span className="font-semibold min-w-fit">{info.name}</span>
                    <span className="text-gray-400">
                      {dim === 'CI' && 'Depth of thinking, pattern recognition, hyperfocus'}
                      {dim === 'ER' && 'Emotional depth, empathy, existential sensitivity'}
                      {dim === 'SA' && 'Sensory sensitivity, aesthetic awareness, overwhelm'}
                      {dim === 'CD' && 'Originality, nonlinear thinking, idea generation'}
                      {dim === 'ED' && 'Meaning-seeking, identity exploration, transformation'}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="pt-4 border-t border-indigo-900/40">
                This assessment is based on Dabrowski's Theory of Positive Disintegration, designed specifically for neurodivergent
                and gifted adults. Your score reflects the intensity of your overexcitabilities—not deficits, but a different way of being.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
