import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  CalendarMonth,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

function Appointments() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. García',
      specialty: 'Medicina General',
      date: '2023-10-15',
      time: '10:00',
      location: 'Hospital San Juan',
      status: 'scheduled'
    },
    {
      id: 2,
      doctor: 'Dra. Rodríguez',
      specialty: 'Cardiología',
      date: '2023-10-20',
      time: '15:30',
      location: 'Clínica Santa María',
      status: 'scheduled'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    location: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value
    });
  };

  const handleCreateAppointment = () => {
    const appointment = {
      id: Date.now(),
      ...newAppointment,
      status: 'scheduled'
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      location: ''
    });
    handleCloseDialog();
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    ));
  };

  const filteredAppointments = appointments.filter(app => {
    if (tabValue === 0) return app.status === 'scheduled';
    if (tabValue === 1) return app.status === 'completed';
    if (tabValue === 2) return app.status === 'cancelled';
    return true;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {t('appointments')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nueva Cita
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Programadas" />
          <Tab label="Completadas" />
          <Tab label="Canceladas" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Grid item xs={12} md={6} lg={4} key={appointment.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {appointment.doctor}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {appointment.specialty}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarMonth sx={{ mr: 1 }} color="primary" />
                    <Typography>
                      {appointment.date} - {appointment.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {appointment.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button size="small" startIcon={<EditIcon />}>
                        Editar
                      </Button>
                      <Button 
                        size="small" 
                        color="error" 
                        startIcon={<DeleteIcon />}
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                No hay citas {tabValue === 0 ? 'programadas' : tabValue === 1 ? 'completadas' : 'canceladas'}
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Programar Nueva Cita</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="doctor"
                label="Doctor"
                fullWidth
                value={newAppointment.doctor}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Especialidad</InputLabel>
                <Select
                  name="specialty"
                  value={newAppointment.specialty}
                  label="Especialidad"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Medicina General">Medicina General</MenuItem>
                  <MenuItem value="Cardiología">Cardiología</MenuItem>
                  <MenuItem value="Pediatría">Pediatría</MenuItem>
                  <MenuItem value="Dermatología">Dermatología</MenuItem>
                  <MenuItem value="Oftalmología">Oftalmología</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="date"
                label="Fecha"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newAppointment.date}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="time"
                label="Hora"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newAppointment.time}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Centro Médico</InputLabel>
                <Select
                  name="location"
                  value={newAppointment.location}
                  label="Centro Médico"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Hospital San Juan">Hospital San Juan</MenuItem>
                  <MenuItem value="Clínica Santa María">Clínica Santa María</MenuItem>
                  <MenuItem value="Centro Médico Norte">Centro Médico Norte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateAppointment}
            disabled={!newAppointment.doctor || !newAppointment.specialty || !newAppointment.date || !newAppointment.time || !newAppointment.location}
          >
            Programar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Appointments;