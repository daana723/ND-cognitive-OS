/**
 * useStore.js
 * Global state management with Zustand
 * Persists to LocalStorage
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createInitialState, transition, setEnergy, setSensory } from './stateMachine.js';
import { createProfile, buildCognitiveMap, getWorkflowRecommendation } from './cognitiveMap.js';
import { detectPatterns } from './patternEngine.js';

const STORAGE_KEY = 'nd-cognitive-os';

export const useStore = create(
  persist(
    (set, get) => ({
      // Core state
      cognitiveState: createInitialState(),
      profile: createProfile(),
      
      // Module data
      emotionalLog: [],
      sensoryLog: [],
      discoveries: [],
      
      // UI
      activeModule: 'dashboard',
      showOnboarding: true,

      // --- Actions ---

      setActiveModule: (mod) => set({ activeModule: mod }),

      dismissOnboarding: () => set({ showOnboarding: false }),

      updateProfile: (data) => set((s) => ({
        profile: { ...s.profile, ...data, updatedAt: new Date().toISOString() }
      })),

      changeState: (newState, context) => set((s) => ({
        cognitiveState: transition(s.cognitiveState, newState, context)
      })),

      updateEnergy: (level) => set((s) => ({
        cognitiveState: setEnergy(s.cognitiveState, level)
      })),

      updateSensory: (level) => set((s) => ({
        cognitiveState: setSensory(s.cognitiveState, level)
      })),

      // Emotional Navigator
      logEmotionalState: (entry) => set((s) => ({
        emotionalLog: [...s.emotionalLog.slice(-199), {
          ...entry,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(36),
        }]
      })),

      // Sensory Check-In
      logSensoryState: (entry) => set((s) => ({
        sensoryLog: [...s.sensoryLog.slice(-199), {
          ...entry,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(36),
        }]
      })),

      // Discoveries
      addDiscovery: (entry) => set((s) => ({
        discoveries: [...s.discoveries, {
          ...entry,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(36),
        }]
      })),

      // Computed
      getCognitiveMap: () => {
        const { cognitiveState } = get();
        return buildCognitiveMap(cognitiveState.history);
      },

      getPatterns: () => {
        const { cognitiveState } = get();
        return detectPatterns(cognitiveState.history);
      },

      getRecommendations: () => {
        const { profile, cognitiveState } = get();
        return getWorkflowRecommendation(profile, cognitiveState);
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        cognitiveState: state.cognitiveState,
        profile: state.profile,
        emotionalLog: state.emotionalLog,
        sensoryLog: state.sensoryLog,
        discoveries: state.discoveries,
        showOnboarding: state.showOnboarding,
      }),
    }
  )
);
