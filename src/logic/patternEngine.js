/**
 * patternEngine.js
 * Detects patterns, cycles, burnout precursors, flow triggers
 * Includes inverted search: "What's missing?"
 */

import { STATES } from './stateMachine.js';

export function detectPatterns(history = []) {
  if (!history.length) return { patterns: [], warnings: [], isEmpty: true };

  const patterns = [];
  const warnings = [];

  // Check for overwhelm loops (overwhelmed -> scattered -> overwhelmed)
  const overwhelmLoop = detectOverwhelmLoop(history);
  if (overwhelmLoop.detected) {
    patterns.push({
      type: 'overwhelm_loop',
      description: 'Overwhelm → Scatter cycle detected',
      frequency: overwhelmLoop.count,
      suggestion: 'Try grounding before task switching. Consider environmental changes.',
    });
    warnings.push('Recurring overwhelm pattern');
  }

  // Check for flow chains
  const flowChains = detectFlowChains(history);
  if (flowChains.detected) {
    patterns.push({
      type: 'flow_trigger',
      description: 'Flow state pattern identified',
      triggers: flowChains.commonPreceding,
      suggestion: 'Recreate these conditions intentionally.',
    });
  }

  // Check for burnout precursors
  const burnoutCheck = detectBurnoutPrecursors(history);
  if (burnoutCheck.risk !== 'low') {
    warnings.push(`Burnout risk: ${burnoutCheck.risk} — ${burnoutCheck.reason}`);
  }

  // Check for chronic scattered state
  const scatteredCheck = detectChronicState(history, STATES.SCATTERED);
  if (scatteredCheck.detected) {
    patterns.push({
      type: 'chronic_scatter',
      description: 'Extended scattered/diffuse attention pattern',
      suggestion: 'May need deeper rest or sensory reduction. Not a productivity problem — a regulation problem.',
    });
  }

  // Inverted search: what's missing?
  const missing = invertedSearch(history);
  if (missing.length > 0) {
    patterns.push({
      type: 'missing_states',
      description: 'States not appearing that might be needed',
      missing,
      suggestion: 'These cognitive states are absent from your map. Worth exploring.',
    });
  }

  return {
    patterns,
    warnings,
    isEmpty: false,
    analyzedAt: new Date().toISOString(),
    entriesAnalyzed: history.length,
  };
}

function detectOverwhelmLoop(history) {
  let count = 0;
  for (let i = 2; i < history.length; i++) {
    const chain = `${history[i-2].to}->${history[i-1].to}->${history[i].to}`;
    if (chain.includes('overwhelmed') && chain.includes('scattered')) count++;
  }
  return { detected: count > 0, count };
}

function detectFlowChains(history) {
  const precedingStates = {};
  history.forEach((entry, i) => {
    if (entry.to === STATES.FLOW && i > 0) {
      const prev = history[i - 1].to;
      precedingStates[prev] = (precedingStates[prev] || 0) + 1;
    }
  });
  const common = Object.entries(precedingStates)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([state]) => state);
  return { detected: common.length > 0, commonPreceding: common };
}

function detectBurnoutPrecursors(history) {
  const recent = history.slice(-20);
  const depletedCount = recent.filter(e => e.energy === 'depleted').length;
  const overwhelmCount = recent.filter(e => e.to === STATES.OVERWHELMED).length;
  const recoveryCount = recent.filter(e => e.to === STATES.RECOVERING).length;

  if (depletedCount > recent.length * 0.5) return { risk: 'high', reason: 'Frequent depleted energy' };
  if (overwhelmCount > 3 && recoveryCount === 0) return { risk: 'medium', reason: 'Overwhelm without recovery' };
  if (depletedCount > recent.length * 0.3) return { risk: 'medium', reason: 'Trending low energy' };
  return { risk: 'low', reason: '' };
}

function detectChronicState(history, state) {
  const recent = history.slice(-15);
  const count = recent.filter(e => e.to === state).length;
  return { detected: count > recent.length * 0.6, percentage: Math.round((count / recent.length) * 100) };
}

function invertedSearch(history) {
  const seen = new Set(history.map(e => e.to));
  const allStates = Object.values(STATES);
  const missing = allStates.filter(s => !seen.has(s));
  
  // Only flag meaningful absences (not dormant/dissociated which are fine to miss)
  const meaningful = missing.filter(s => 
    ![STATES.DORMANT, STATES.DISSOCIATED].includes(s)
  );
  return meaningful;
}
