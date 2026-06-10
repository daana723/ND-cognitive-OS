import { useState } from 'react';
import { useStore } from '../../logic/useStore';

const QUESTIONS = [
  // D1 - Cognitive Intensity (8 questions)
  { dim: 'CI', text: 'I can spend hours absorbed in a single topic without noticing time passing.' },
  { dim: 'CI', text: 'I often see connections between things that seem unrelated to others.' },
  { dim: 'CI', text: 'My mind races with ideas faster than I can express them.' },
  { dim: 'CI', text: 'I prefer deep, complex topics over simple, straightforward ones.' },
  { dim: 'CI', text: 'I find myself questioning things that others accept without thought.' },
  { dim: 'CI', text: 'I can engage in intense intellectual debates that last for hours.' },
  { dim: 'CI', text: 'I often have multiple layers of thought happening simultaneously.' },
  { dim: 'CI', text: 'I become frustrated when I cannot fully understand something.' },

  // D2 - Emotional Resonance (8 questions)
  { dim: 'ER', text: 'I feel others\' emotions as if they were my own.' },
  { dim: 'ER', text: 'I have experienced grief so intense it felt physical.' },
  { dim: 'ER', text: 'I can be moved to tears by music, art, or stories.' },
  { dim: 'ER', text: 'I sometimes feel overwhelmed by the suffering in the world.' },
  { dim: 'ER', text: 'My emotional responses are often stronger than others expect.' },
  { dim: 'ER', text: 'I form deep attachments to people, places, and even objects.' },
  { dim: 'ER', text: 'I experience joy and beauty very intensely.' },
  { dim: 'ER', text: 'I am deeply affected by injustice, even when it doesn\'t directly impact me.' },

  // D3 - Sensory Amplification (8 questions)
  { dim: 'SA', text: 'Certain textures, sounds, or smells can overwhelm me.' },
  { dim: 'SA', text: 'I am deeply affected by my physical environment.' },
  { dim: 'SA', text: 'I notice sensory details that others seem to miss.' },
  { dim: 'SA', text: 'I have strong preferences about food, clothing, or aesthetics.' },
  { dim: 'SA', text: 'Bright lights, loud noises, or strong smells can be painful.' },
  { dim: 'SA', text: 'I need time to adjust when my environment changes significantly.' },
  { dim: 'SA', text: 'I am sensitive to how things taste, feel, or sound.' },
  { dim: 'SA', text: 'I can become distressed by sensory chaos like crowds or markets.' },

  // D4 - Creative Divergence (8 questions)
  { dim: 'CD', text: 'I often think in metaphors and images rather than words.' },
  { dim: 'CD', text: 'I come up with ideas that others find strange or unusual.' },
  { dim: 'CD', text: 'I see multiple possible solutions to every problem.' },
  { dim: 'CD', text: 'I sometimes struggle to explain my thinking process to others.' },
  { dim: 'CD', text: 'I prefer to find my own way rather than follow instructions.' },
  { dim: 'CD', text: 'My creativity often leads me in unexpected directions.' },
  { dim: 'CD', text: 'I enjoy experimenting and taking unconventional approaches.' },
  { dim: 'CD', text: 'I blend different ideas or fields in ways that surprise people.' },

  // D5 - Existential Drive (8 questions)
  { dim: 'ED', text: 'I often think about the meaning and purpose of life.' },
  { dim: 'ED', text: 'I feel a strong need to understand myself at a deep level.' },
  { dim: 'ED', text: 'I sometimes feel like I don\'t fit into the world around me.' },
  { dim: 'ED', text: 'I have experienced periods of intense inner transformation.' },
  { dim: 'ED', text: 'I feel things deeply.' },
  { dim: 'ED', text: 'I am driven by a search for authenticity and truth.' },
  { dim: 'ED', text: 'I question who I am and who I want to become.' },
  { dim: 'ED', text: 'I believe my life should have a larger purpose or meaning.' },
];

const DIMENSIONS = {
  CI: { name: 'Cognitive Intensity', icon: '▲', color: 'indigo-600' },
  ER: { name: 'Emotional Resonance', icon: '●', color: 'rose-600' },
  SA: { name: 'Sensory Amplification', icon: '✱', color: 'amber-600' },
  CD: { name: 'Creative Divergence', icon: '◆', color: 'violet-600' },
  ED: { name: 'Existential Drive', icon: '◉', color: 'blue-600' },
};

export default function SPARKAssessment() {
  const [responses, setResponses] = useState(Array(40).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { sparkAssessmentResults } = useStore();
  const saveResults = useStore((s) => s.saveSparkResults);

  const handleResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    if (currentQuestion < 39) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    // Calculate dimension scores
    const dimScores = {};
    QUESTIONS.forEach((q, idx) => {
      if (!dimScores[q.dim]) dimScores[q.dim] = [];
      dimScores[q.dim].push(responses[idx] || 0);
    });

    const results = {};
    let totalScore = 0;
    Object.keys(dimScores).forEach((dim) => {
      const avg = dimScores[dim].reduce((a, b) => a + b, 0) / dimScores[dim].length;
      results[dim] = avg;
      totalScore += avg;
    });

    const sparkIndex = totalScore;

    // Determine profile type
    let profileType = 'The Quiet Spark';
    if (sparkIndex >= 17) profileType = 'The Wildfire';
    else if (sparkIndex >= 13) profileType = 'The Burning Spark';
    else if (sparkIndex >= 7) profileType = 'The Flickering Spark';

    saveResults({ results, sparkIndex, profileType });
  };

  const isComplete = responses.every((r) => r !== null);
  const progress = Math.round((responses.filter((r) => r !== null).length / 40) * 100);
  const q = QUESTIONS[currentQuestion];
  const dim = DIMENSIONS[q.dim];

  return (
    <div className="min-h-screen bg-arcane-dark">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">◈</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">2E SPARK Assessment</h1>
              <p className="text-sm text-gray-400">Understanding your cognitive intensity</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-indigo-950/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{progress}% complete</p>
        </div>

        {/* Question card */}
        <div className="card mb-8 border-l-4 border-indigo-500">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-2xl text-${dim.color}`}>{dim.icon}</span>
            <span className="text-sm font-medium text-indigo-300">{dim.name}</span>
            <span className="text-xs text-gray-500 ml-auto">
              Question {currentQuestion + 1} of 40
            </span>
          </div>

          <h2 className="text-lg font-semibold text-gray-100 mb-6">{q.text}</h2>

          {/* Likert scale */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((value) => (
              <button
                key={value}
                onClick={() => handleResponse(value)}
                className={`py-3 px-2 rounded-lg font-medium text-sm transition-all ${
                  responses[currentQuestion] === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-950/40 text-gray-300 hover:bg-indigo-900/60'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="btn-ghost disabled:opacity-50"
          >
            Back
          </button>

          <div className="text-sm text-gray-400">
            {responses.filter((r) => r !== null).length} of 40 answered
          </div>

          {currentQuestion < 39 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={responses[currentQuestion] === null}
              className="btn-primary disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="btn-primary disabled:opacity-50"
            >
              See Results
            </button>
          )}
        </div>

        {/* Question preview */}
        <div className="bg-indigo-950/20 rounded-lg p-4 text-xs text-gray-400">
          <div className="flex gap-1 flex-wrap">
            {QUESTIONS.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  responses[idx] !== null ? 'bg-indigo-500' : 'bg-indigo-900/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
