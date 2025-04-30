import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { medicalAgent } from '../../agents/MedicalAgent';
import MedicalChat from '../../components/chat/MedicalChat';

function AdminDashboard() {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.user);

  const [stats, setStats] = useState({
    totalAppointments: 0,
    activePatients: 0,
    totalPoints: 0,
    averageRating: 0
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulación de carga de datos
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Datos simulados
        setStats({
          totalAppointments: 150,
          activePatients: 45,
          totalPoints: 7500,
          averageRating: 4.8
        });

        setAppointments([
          {
            id: '1',
            patientName: 'Ana García',
            doctorName: 'Dr. Martínez',
            date: '2024-03-15',
            time: '10:00',
            status: 'scheduled',
            points: 100
          },
          {
            id: '2',
            patientName: 'Carlos López',
            doctorName: 'Dra. Rodríguez',
            date: '2024-03-15',
            time: '11:30',
            status: 'completed',
            points: 150
          },
          // Más citas simuladas...
        ]);
      } catch (err) {
        setError(t('admin.dashboard.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ color: color, mr: 1 }} />
          <Typography color="textSecondary" variant="h6">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={HospitalIcon}
            title={t('admin.dashboard.totalAppointments')}
            value={stats.totalAppointments}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={PersonIcon}
            title={t('admin.dashboard.activePatients')}
            value={stats.activePatients}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={StarIcon}
            title={t('admin.dashboard.totalPoints')}
            value={stats.totalPoints}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={ScheduleIcon}
            title={t('admin.dashboard.averageRating')}
            value={stats.averageRating}
            color="info.main"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('admin.dashboard.recentAppointments')}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('admin.table.patient')}</TableCell>
                    <TableCell>{t('admin.table.doctor')}</TableCell>
                    <TableCell>{t('admin.table.date')}</TableCell>
                    <TableCell>{t('admin.table.time')}</TableCell>
                    <TableCell>{t('admin.table.status')}</TableCell>
                    <TableCell align="right">{t('admin.table.points')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              appointment.status === 'completed'
                                ? 'success.main'
                                : 'text.secondary'
                          }}
                        >
                          {t(`admin.status.${appointment.status}`)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                          {appointment.points}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%' }}>
            <MedicalChat />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;