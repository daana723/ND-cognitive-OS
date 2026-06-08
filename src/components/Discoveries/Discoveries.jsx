import { useState } from 'react';
import { useStore } from '../../logic/useStore';

const DISCOVERY_TYPES = [
  { id: 'insight', label: '💡 Insight', desc: 'A new understanding' },
  { id: 'pattern', label: '🔗 Pattern', desc: 'Something recurring' },
  { id: 'realization', label: '✨ Realization', desc: 'Something clicked' },
  { id: 'question', label: '❓ Question', desc: 'Something to explore' },
  { id: 'breakthrough', label: '🚀 Breakthrough', desc: 'Major shift' },
];

export default function Discoveries() {
  const addDiscovery = useStore((s) => s.addDiscovery);
  const discoveries = useStore((s) => s.discoveries);
  const [type, setType] = useState('insight');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleAdd = () => {
    if (!content.trim()) return;
    addDiscovery({
      type,
      content: content.trim(),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setContent('');
    setTags('');
  };

  const sorted = [...discoveries].reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-100 mb-1">Discoveries</h2>
        <p className="text-sm text-indigo-300/70">Capture insights, patterns, and realizations</p>
      </div>

      {/* Input */}
      <section className="card space-y-4">
        <h3 className="label">New Discovery</h3>
        
        <div className="flex flex-wrap gap-2">
          {DISCOVERY_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                type === t.id
                  ? 'bg-indigo-600/30 text-indigo-200 ring-1 ring-indigo-400/50'
                  : 'bg-arcane-dark/50 text-gray-400 hover:text-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you discover?"
          className="input w-full h-24 resize-none"
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="input flex-1 text-sm"
          />
          <button onClick={handleAdd} className="btn-primary">Capture</button>
        </div>
      </section>

      {/* List */}
      {sorted.length > 0 && (
        <section className="card">
          <h3 className="label mb-3">Your Discoveries ({sorted.length})</h3>
          <div className="space-y-3">
            {sorted.map((d) => {
              const typeInfo = DISCOVERY_TYPES.find((t) => t.id === d.type);
              return (
                <div key={d.id} className="border-b border-indigo-900/20 pb-3 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{typeInfo?.label || '💡'}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(d.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm">{d.content}</p>
                  {d.tags?.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {d.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/20 text-indigo-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
