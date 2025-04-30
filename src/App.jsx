import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ChatBot from './pages/chatbot/ChatBot';
import Appointments from './pages/appointments/Appointments';
import MedicalHistory from './pages/medical/MedicalHistory';
import AlyWallet from './pages/wallet/AlyWallet';
import Store from './pages/store/Store';
import AdminPanel from './pages/admin/AdminPanel';
import Test from './test';

function App() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chatbot" element={<ChatBot />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="medical-history" element={<MedicalHistory />} />
          <Route path="aly-wallet" element={<AlyWallet />} />
          <Route path="store" element={<Store />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;