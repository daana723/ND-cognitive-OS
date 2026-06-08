/**
 * cognitiveMap.js
 * Builds and maintains the user's cognitive profile
 * Layers: Profile, Cognitive Map, Pattern Recognition
 */

import { STATES, ENERGY_LEVELS, SENSORY_LEVELS } from './stateMachine.js';

export const cognitiveStyles = {
  LINEAR: 'linear',
  NONLINEAR: 'nonlinear',
  CYCLICAL: 'cyclical',
  SPIRAL: 'spiral',
  CONSTELLATION: 'constellation',
};

export const attentionPatterns = {
  NARROW_FOCUS: 'narrow_focus',
  WIDE_SCAN: 'wide_scan',
  ROTATING: 'rotating',
  DEPTH_FIRST: 'depth_first',
  BURST: 'burst',
};

export function createProfile(data = {}) {
  return {
    cognitiveStyle: data.cognitiveStyle || cognitiveStyles.NONLINEAR,
    attentionPattern: data.attentionPattern || attentionPatterns.ROTATING,
    sensoryProfile: data.sensoryProfile || {
      visual: 'high',
      auditory: 'medium',
      tactile: 'low',
      olfactory: 'low',
    },
    strengths: data.strengths || [],
    challenges: data.challenges || [],
    triggers: data.triggers || [],
    flowConditions: data.flowConditions || [],
    recoveryStrategies: data.recoveryStrategies || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Map cognitive style to recommended workflow
export function getWorkflowRecommendation(profile, currentState) {
  const { cognitiveStyle, attentionPattern } = profile;
  const { current, energy, sensory } = currentState;

  const recommendations = [];

  // Style-based
  if (cognitiveStyle === cognitiveStyles.NONLINEAR) {
    recommendations.push('Use mind-mapping, not lists');
    recommendations.push('Allow topic switching with capture');
  } else if (cognitiveStyle === cognitiveStyles.CYCLICAL) {
    recommendations.push('Work in returning spirals, not linear progress');
    recommendations.push('Build in review cycles');
  }

  // State-based
  if (current === STATES.OVERWHELMED || current === STATES.SCATTERED) {
    recommendations.push('Single micro-step only');
    recommendations.push('Reduce sensory input');
    recommendations.push('Grounding exercise first');
  } else if (current === STATES.FLOW || current === STATES.HYPERFOCUS) {
    recommendations.push('Protect this state');
    recommendations.push('Set a gentle timer for breaks');
  }

  // Energy-based
  if (energy === ENERGY_LEVELS.DEPLETED) {
    recommendations.push('Rest is the task');
    recommendations.push('No new inputs');
  }

  return recommendations;
}

// Build cognitive map from history entries
export function buildCognitiveMap(history = []) {
  if (!history.length) return { patterns: [], insights: [], isEmpty: true };

  const stateFrequency = {};
  const timePatterns = {};
  const transitionChains = {};

  history.forEach((entry, i) => {
    // State frequency
    stateFrequency[entry.to] = (stateFrequency[entry.to] || 0) + 1;

    // Time of day patterns
    const hour = new Date(entry.timestamp).getHours();
    const timeBlock = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    if (!timePatterns[timeBlock]) timePatterns[timeBlock] = {};
    timePatterns[timeBlock][entry.to] = (timePatterns[timeBlock][entry.to] || 0) + 1;

    // Transition chains (what leads to what)
    if (i > 0) {
      const key = `${entry.from}->${entry.to}`;
      transitionChains[key] = (transitionChains[key] || 0) + 1;
    }
  });

  // Find most common transitions
  const topTransitions = Object.entries(transitionChains)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([chain, count]) => ({ chain, count }));

  // Generate insights
  const insights = [];
  const total = history.length;
  
  const flowCount = stateFrequency[STATES.FLOW] || 0;
  const flowPct = Math.round((flowCount / total) * 100);
  if (flowPct > 0) insights.push(`Flow state: ${flowPct}% of tracked time`);

  const overwhelmCount = stateFrequency[STATES.OVERWHELMED] || 0;
  if (overwhelmCount > total * 0.2) insights.push('Overwhelm appears frequently — consider environmental adjustments');

  return {
    stateFrequency,
    timePatterns,
    topTransitions,
    insights,
    totalEntries: total,
    isEmpty: false,
    generatedAt: new Date().toISOString(),
  };
}
