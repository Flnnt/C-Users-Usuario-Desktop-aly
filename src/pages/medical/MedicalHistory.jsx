import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  LocalHospital,
  Medication,
  Vaccines,
  Biotech
} from '@mui/icons-material';

function MedicalHistory() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Datos de ejemplo para el historial médico
  const consultations = [
    {
      id: 1,
      date: '10/09/2023',
      doctor: 'Dr. García',
      specialty: 'Medicina General',
      diagnosis: 'Infección respiratoria',
      treatment: 'Antibióticos, reposo',
      notes: 'Seguimiento en 7 días'
    },
    {
      id: 2,
      date: '15/08/2023',
      doctor: 'Dra. Rodríguez',
      specialty: 'Cardiología',
      diagnosis: 'Hipertensión leve',
      treatment: 'Enalapril 10mg',
      notes: 'Control en 1 mes'
    }
  ];

  const medications = [
    {
      id: 1,
      name: 'Enalapril',
      dosage: '10mg',
      frequency: 'Una vez al día',
      startDate: '15/08/2023',
      endDate: 'Continuo',
      prescribedBy: 'Dra. Rodríguez'
    },
    {
      id: 2,
      name: 'Amoxicilina',
      dosage: '500mg',
      frequency: 'Cada 8 horas',
      startDate: '10/09/2023',
      endDate: '17/09/2023',
      prescribedBy: 'Dr. García'
    }
  ];

  const labResults = [
    {
      id: 1,
      date: '05/09/2023',
      type: 'Análisis de sangre',
      requestedBy: 'Dr. García',
      results: [
        { name: 'Hemoglobina', value: '14.5 g/dL', reference: '12-16 g/dL', status: 'normal' },
        { name: 'Leucocitos', value: '9,500 /μL', reference: '4,500-11,000 /μL', status: 'normal' },
        { name: 'Glucosa', value: '110 mg/dL', reference: '70-100 mg/dL', status: 'elevated' }
      ]
    },
    {
      id: 2,
      date: '10/08/2023',
      type: 'Electrocardiograma',
      requestedBy: 'Dra. Rodríguez',
      results: [
        { name: 'Ritmo', value: 'Sinusal', reference: 'Sinusal', status: 'normal' },
        { name: 'Frecuencia', value: '85 lpm', reference: '60-100 lpm', status: 'normal' }
      ]
    }
  ];

  const vaccinations = [
    {
      id: 1,
      name: 'Influenza',
      date: '15/05/2023',
      location: 'Centro de Salud Norte',
      nextDose: '15/05/2024'
    },
    {
      id: 2,
      name: 'COVID-19',
      date: '20/03/2023',
      location: 'Hospital San Juan',
      nextDose: 'Completado'
    },
    {
      id: 3,
      name: 'Tétanos',
      date: '10/01/2020',
      location: 'Clínica Santa María',
      nextDose: '10/01/2030'
    }
  ];

  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Consultas
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>Diagnóstico</TableCell>
                  <TableCell>Tratamiento</TableCell>
                  <TableCell>Notas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>{consultation.date}</TableCell>
                    <TableCell>{consultation.doctor}</TableCell>
                    <TableCell>{consultation.specialty}</TableCell>
                    <TableCell>{consultation.diagnosis}</TableCell>
                    <TableCell>{consultation.treatment}</TableCell>
                    <TableCell>{consultation.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case 1: // Medicamentos
        return (
          <Grid container spacing={2}>
            {medications.map((medication) => (
              <Grid item xs={12} md={6} key={medication.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Medication color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">{medication.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Dosis:</strong> {medication.dosage}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Frecuencia:</strong> {medication.frequency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Inicio:</strong> {medication.startDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Fin:</strong> {medication.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Prescrito por:</strong> {medication.prescribedBy}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 2: // Resultados de laboratorio
        return (
          <Box>
            {labResults.map((labResult) => (
              <Accordion key={labResult.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Biotech color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">{labResult.type}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {labResult.date}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Solicitado por:</strong> {labResult.requestedBy}
                  </Typography>
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Parámetro</TableCell>
                          <TableCell>Valor</TableCell>
                          <TableCell>Referencia</TableCell>
                          <TableCell>Estado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {labResult.results.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.name}</TableCell>
                            <TableCell>{result.value}</TableCell>
                            <TableCell>{result.reference}</TableCell>
                            <TableCell>
                              <Chip 
                                label={result.status === 'normal' ? 'Normal' : 'Elevado'} 
                                color={result.status === 'normal' ? 'success' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <PrintIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        );

      case 3: // Vacunas
        return (
          <Grid container spacing={2}>
            {vaccinations.map((vaccination) => (
              <Grid item xs={12} md={4} key={vaccination.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Vaccines color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">{vaccination.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Fecha:</strong> {vaccination.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Centro:</strong> {vaccination.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Próxima dosis:</strong> {vaccination.nextDose}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {t('medicalHistory')}
        </Typography>
        <Box>
          <Button startIcon={<DownloadIcon />} sx={{ mr: 1 }}>
            Descargar
          </Button>
          <Button startIcon={<ShareIcon />}>
            Compartir
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<LocalHospital />} label="Consultas" />
          <Tab icon={<Medication />} label="Medicamentos" />
          <Tab icon={<Biotech />} label="Resultados" />
          <Tab icon={<Vaccines />} label="Vacunas" />
        </Tabs>
      </Paper>

      {renderTabContent()}
    </Box>
  );
}

export default MedicalHistory;