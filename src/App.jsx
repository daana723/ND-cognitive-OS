import { useStore } from './logic/useStore';
import Dashboard from './Profile/Dashboard';
import EmotionalNavigator from './EmotionalNavigator/EmotionalNavigator';
import SensoryCheckIn from './SensoryCheckIn/SensoryCheckIn';
import Discoveries from './Discoveries/Discoveries';
import Recommendations from './Recommendations/Recommendations';
import PatternEngine from './PatternEngine/PatternEngine';
import Onboarding from './Profile/Onboarding';
import Navbar from './Profile/Navbar';

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
