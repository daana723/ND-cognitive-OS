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
import { translateSparkProfile, getSparkRecommendations } from './sparkTranslation.js';

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
      sparkAssessmentResults: null,

      // UI
      activeModule: 'dashboard',
      showOnboarding: true,

      // --- Actions ---

      setActiveModule: (mod) => set({ activeModule: mod }),

      dismissOnboarding: () => set({ showOnboarding: false }),

      updateProfile: (data) => set((s) => ({
        profile: { ...s.profile, ...data, updatedAt: new Date().toISOString() }
      })),

      saveSparkResults: (results) => set({
        sparkAssessmentResults: results,
        activeModule: 'sparkResults'
      }),

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
        const { profile, cognitiveState, sparkAssessmentResults } = get();
        const stateBased = getWorkflowRecommendation(profile, cognitiveState);
        const sparkBased = getSparkRecommendations(sparkAssessmentResults);
        // Merge, strengths-first SPARK guidance ahead of generic state guidance,
        // de-duplicated.
        return [...new Set([...sparkBased, ...stateBased])];
      },

      // Cognitive Translation: strengths-first reading of the SPARK profile.
      getSparkTranslation: () => {
        const { sparkAssessmentResults } = get();
        return translateSparkProfile(sparkAssessmentResults);
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
        sparkAssessmentResults: state.sparkAssessmentResults,
        showOnboarding: state.showOnboarding,
      }),
    }
  )
);
