import { useState } from 'react';
import { useStore } from '../../logic/useStore';
import { cognitiveStyles, attentionPatterns } from '../../logic/cognitiveMap';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const updateProfile = useStore((s) => s.updateProfile);
  const dismissOnboarding = useStore((s) => s.dismissOnboarding);

  const handleDismiss = () => {
    const profile = useStore.getState().profile;
    // Only dismiss if profile is set
    if (profile.cognitiveStyle) {
      dismissOnboarding();
    }
  };

  const steps = [
    {
      title: 'Welcome to your Cognitive OS',
      subtitle: 'This is not productivity software. This is cognitive infrastructure.',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>This system helps you understand:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>How you think</li>
            <li>How you regulate</li>
            <li>How you create</li>
            <li>How you enter flow</li>
            <li>How you recover</li>
          </ul>
          <p className="text-sm text-indigo-300">Everything stays on your machine. LocalStorage only.</p>
        </div>
      ),
    },
    {
      title: 'How do you think?',
      subtitle: 'There are no wrong answers.',
      content: (
        <div className="space-y-3">
          <label className="label">Cognitive style</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(cognitiveStyles).map(([key, val]) => (
              <StyleButton key={val} value={val} label={key} onSelect={(v) => updateProfile({ cognitiveStyle: v })} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Attention pattern',
      subtitle: 'How does your attention typically move?',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(attentionPatterns).map(([key, val]) => (
              <StyleButton key={val} value={val} label={key.replace(/_/g, ' ')} onSelect={(v) => updateProfile({ attentionPattern: v })} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'You\'re set',
      subtitle: 'Your cognitive map will build as you use the system.',
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Start by checking in:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Emotional</strong> — track your states and triggers</li>
            <li><strong>Sensory</strong> — monitor your environment load</li>
            <li><strong>Discoveries</strong> — capture insights as they come</li>
          </ul>
          <p className="text-sm text-indigo-300">Patterns will emerge over time. Trust the process.</p>
        </div>
      ),
    },
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen bg-arcane-dark flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">◈</span>
          <span className="text-indigo-300 font-medium">ND Cognitive OS</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-100 mb-1">{current.title}</h2>
        <p className="text-sm text-indigo-300/70 mb-6">{current.subtitle}</p>

        {current.content}

        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost">Back</button>
          ) : (
            <button onClick={handleDismiss} className="text-sm text-gray-500 hover:text-gray-300">Skip</button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="btn-primary">Next</button>
          ) : (
            <button onClick={handleDismiss} className="btn-primary">Begin</button>
          )}
        </div>

        <div className="flex gap-1 mt-6 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-indigo-500' : 'bg-indigo-900/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StyleButton({ value, label, onSelect }) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="btn-ghost text-left text-sm capitalize py-3"
    >
      {label.toLowerCase()}
    </button>
  );
}
