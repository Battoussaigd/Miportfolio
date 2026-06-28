import { useState } from 'react';
import CoursePage from '../components/CoursePage';
import { coursesData } from '../data/courses.data';

export default function CursoEmprendedores() {
  const [isDark] = useState(true);
  return <CoursePage course={coursesData.emprendedores} isDark={isDark} />;
}
