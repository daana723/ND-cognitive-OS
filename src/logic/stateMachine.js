/**
 * stateMachine.js
 * Core state management for cognitive states
 * Tracks: current state, transitions, energy level, sensory load
 */

export const STATES = {
  FLOW: 'flow',
  FOCUSED: 'focused',
  SCATTERED: 'scattered',
  OVERWHELMED: 'overwhelmed',
  RECOVERING: 'recovering',
  DORMANT: 'dormant',
  HYPERFOCUS: 'hyperfocus',
  DISSOCIATED: 'dissociated',
};

export const ENERGY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  DEPLETED: 'depleted',
};

export const SENSORY_LEVELS = {
  CALM: 'calm',
  MODERATE: 'moderate',
  ELEVATED: 'elevated',
  OVERLOAD: 'overload',
};

export function createInitialState() {
  return {
    current: STATES.DORMANT,
    energy: ENERGY_LEVELS.MEDIUM,
    sensory: SENSORY_LEVELS.CALM,
    lastTransition: null,
    history: [],
  };
}

export function transition(state, newState, context = {}) {
  const timestamp = new Date().toISOString();
  const entry = {
    from: state.current,
    to: newState,
    timestamp,
    energy: state.energy,
    sensory: state.sensory,
    ...context,
  };

  return {
    ...state,
    current: newState,
    lastTransition: timestamp,
    history: [...state.history.slice(-99), entry], // keep last 100
  };
}

export function setEnergy(state, level) {
  return { ...state, energy: level };
}

export function setSensory(state, level) {
  return { ...state, sensory: level };
}

// Valid transitions — not all states can go to all other states
export const VALID_TRANSITIONS = {
  [STATES.FLOW]: [STATES.FOCUSED, STATES.SCATTERED, STATES.RECOVERING, STATES.HYPERFOCUS],
  [STATES.FOCUSED]: [STATES.FLOW, STATES.SCATTERED, STATES.OVERWHELMED, STATES.HYPERFOCUS],
  [STATES.SCATTERED]: [STATES.FOCUSED, STATES.OVERWHELMED, STATES.RECOVERING, STATES.DISSOCIATED],
  [STATES.OVERWHELMED]: [STATES.RECOVERING, STATES.SCATTERED, STATES.DISSOCIATED],
  [STATES.RECOVERING]: [STATES.FOCUSED, STATES.DORMANT, STATES.SCATTERED],
  [STATES.DORMANT]: [STATES.FOCUSED, STATES.RECOVERING],
  [STATES.HYPERFOCUS]: [STATES.FLOW, STATES.FOCUSED, STATES.OVERWHELMED, STATES.RECOVERING],
  [STATES.DISSOCIATED]: [STATES.RECOVERING, STATES.DORMANT, STATES.SCATTERED],
};

export function canTransition(from, to) {
  const valid = VALID_TRANSITIONS[from];
  if (!valid) return false;
  return valid.includes(to);
}
