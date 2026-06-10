import { useStore } from './logic/useStore';
import Dashboard from './components/Profile/Dashboard';
import EmotionalNavigator from './components/EmotionalNavigator/EmotionalNavigator';
import SensoryCheckIn from './components/SensoryCheckIn/SensoryCheckIn';
import Discoveries from './components/Discoveries/Discoveries';
import Recommendations from './components/Recommendations/Recommendations';
import PatternEngine from './components/PatternEngine/PatternEngine';
import Onboarding from './components/Profile/Onboarding';
import Navbar from './components/Profile/Navbar';

const MODULES = {
  dashboard: Dashboard,
  emotional: EmotionalNavigator,
  sensory: SensoryCheckIn,
  discoveries: Discoveries,
  recommendations: Recommendations,
  patterns: PatternEngine,
};

export default function App() {
  const activeModule = useStore((s) => s.activeModule);
  const showOnboarding = useStore((s) => s.showOnboarding);

  if (showOnboarding) return <Onboarding />;

  const ModuleComponent = MODULES[activeModule] || Dashboard;

  return (
    <div className="min-h-screen bg-arcane-dark">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <ModuleComponent />
      </main>
    </div>
  );
}
