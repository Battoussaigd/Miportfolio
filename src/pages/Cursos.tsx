import { useApp } from '../context/AppContext';
import { CoursesSection } from '../components/CoursesSection';

export default function Cursos() {
  const { isDark } = useApp();
  return (
    <div className="pt-20">
      <CoursesSection isDark={isDark} />
    </div>
  );
}
