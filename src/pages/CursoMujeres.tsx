import { useState } from 'react';
import CoursePage from '../components/CoursePage';
import { coursesData } from '../data/courses.data';

export default function CursoMujeres() {
  const [isDark] = useState(true);
  return <CoursePage course={coursesData.mujeres} isDark={isDark} />;
}
