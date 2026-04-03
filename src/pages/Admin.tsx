import AdminPanel from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  return <AdminPanel onClose={() => navigate('/')} />;
}