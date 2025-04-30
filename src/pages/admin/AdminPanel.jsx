import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  LocalHospital as LocalHospitalIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

function AdminPanel() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'patient', status: 'active' },
    { id: 2, name: 'María López', email: 'maria@example.com', role: 'doctor', status: 'active' },
    { id: 3, name: 'Carlos Gómez', email: 'carlos@example.com', role: 'admin', status: 'inactive' },
    { id: 4, name: 'Ana Rodríguez', email: 'ana@example.com', role: 'patient', status: 'active' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dra. María López', specialty: 'Cardiología', patients: 45, rating: 4.8 },
    { id: 2, name: 'Dr. Roberto Sánchez', specialty: 'Pediatría', patients: 38, rating: 4.6 },
    { id: 3, name: 'Dra. Laura Martínez', specialty: 'Dermatología', patients: 52, rating: 4.9 }
  ]);

  const [clinics, setClinics] = useState([
    { id: 1, name: 'Hospital San Juan', address: 'Av. Principal 123', doctors: 25, services: 12 },
    { id: 2, name: 'Clínica Santa María', address: 'Calle Médica 456', doctors: 18, services: 8 },
    { id: 3, name: 'Centro Médico Norte', address: 'Jr. Salud 789', doctors: 15, services: 10 }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Usuarios
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                placeholder="Buscar usuarios..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('user')}
              >
                Nuevo Usuario
              </Button>
            </Box>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role === 'admin' ? 'Administrador' : user.role === 'doctor' ? 'Doctor' : 'Paciente'} 
                          color={user.role === 'admin' ? 'secondary' : user.role === 'doctor' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.status === 'active' ? 'Activo' : 'Inactivo'} 
                          color={user.status === 'active' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );

      case 1: // Doctores
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                placeholder="Buscar doctores..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('doctor')}
              >
                Nuevo Doctor
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {doctors.map((doctor) => (
                <Grid item xs={12} md={4} key={doctor.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">{doctor.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Especialidad:</strong> {doctor.specialty}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Pacientes:</strong> {doctor.patients}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Calificación:</strong> {doctor.rating}/5
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2: // Clínicas
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                placeholder="Buscar clínicas..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('clinic')}
              >
                Nueva Clínica
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {clinics.map((clinic) => (
                <Grid item xs={12} md={4} key={clinic.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>{clinic.name}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Dirección:</strong> {clinic.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Doctores:</strong> {clinic.doctors}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Servicios:</strong> {clinic.services}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3: // Configuración
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Configuración del Sistema</Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Configuración General</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Sistema"
                    defaultValue="ALY - Sistema Médico"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Idioma Predeterminado</InputLabel>
                    <Select
                      defaultValue="es"
                      label="Idioma Predeterminado"
                    >
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="en">Inglés</MenuItem>
                      <MenuItem value="qu">Quechua</MenuItem>
                      <MenuItem value="ay">Aymara</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Guardar Cambios</Button>
              </Box>
            </Paper>
            
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Configuración de Puntos ALY</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Puntos por Consulta Médica"
                    type="number"
                    defaultValue="50"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Puntos por Actualización de Historial"
                    type="number"
                    defaultValue="20"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Puntos por Registro"
                    type="number"
                    defaultValue="100"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tasa de Conversión (1 ALY = X USD)"
                    type="number"
                    defaultValue="0.1"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Guardar Cambios</Button>
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('admin')}
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<PersonIcon />} label="Usuarios" />
          <Tab icon={<LocalHospitalIcon />} label="Doctores" />
          <Tab icon={<LocalHospitalIcon />} label="Clínicas" />
          <Tab icon={<SettingsIcon />} label="Configuración" />
        </Tabs>
      </Paper>

      {renderTabContent()}

      {/* Diálogos para crear/editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'user' ? 'Nuevo Usuario' : 
           dialogType === 'doctor' ? 'Nuevo Doctor' : 
           'Nueva Clínica'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {dialogType === 'user' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField label="Nombre" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth type="email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Contraseña" fullWidth type="password" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select label="Rol">
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="doctor">Doctor</MenuItem>
                      <MenuItem value="patient">Paciente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {dialogType === 'doctor' && (
              <>
                <Grid item xs={12}>
                  <TextField label="Nombre" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Especialidad</InputLabel>
                    <Select label="Especialidad">
                      <MenuItem value="cardiology">Cardiología</MenuItem>
                      <MenuItem value="pediatrics">Pediatría</MenuItem>
                      <MenuItem value="dermatology">Dermatología</MenuItem>
                      <MenuItem value="general">Medicina General</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email" fullWidth type="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Teléfono" fullWidth />
                </Grid>
              </>
            )}

            {dialogType === 'clinic' && (
              <>
                <Grid item xs={12}>
                  <TextField label="Nombre" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Dirección" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Teléfono" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth type="email" />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPanel;