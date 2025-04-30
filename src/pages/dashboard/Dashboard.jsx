import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarMonth,
  LocalHospital,
  AccountBalanceWallet,
  Notifications,
  Person
} from '@mui/icons-material';

function Dashboard() {
  const { t } = useTranslation();
  const [userStats, setUserStats] = useState({
    name: 'Usuario Demo',
    nextAppointment: '15/10/2023',
    alyPoints: 250,
    pendingResults: 2
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'appointment', date: '05/10/2023', description: 'Consulta con Dr. García' },
    { id: 2, type: 'test', date: '01/10/2023', description: 'Resultados de análisis de sangre' },
    { id: 3, type: 'payment', date: '28/09/2023', description: 'Pago de consulta médica' }
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard')}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Resumen del usuario */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
                <Person />
              </Avatar>
              <Typography variant="h6">{userStats.name}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonth color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Próxima cita" 
                  secondary={userStats.nextAppointment} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceWallet color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Puntos ALY" 
                  secondary={userStats.alyPoints} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Notifications color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Resultados pendientes" 
                  secondary={userStats.pendingResults} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Actividad reciente */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Actividad Reciente
            </Typography>
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemIcon>
                    {activity.type === 'appointment' ? <CalendarMonth color="primary" /> : 
                     activity.type === 'test' ? <LocalHospital color="primary" /> : 
                     <AccountBalanceWallet color="primary" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={activity.description} 
                    secondary={activity.date} 
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="text">Ver todo</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Accesos rápidos */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Accesos Rápidos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CalendarMonth sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">
                    {t('appointments')}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Agendar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocalHospital sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">
                    {t('medicalHistory')}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Ver
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">
                    {t('alyWallet')}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Gestionar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <DashboardIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">
                    {t('store')}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;