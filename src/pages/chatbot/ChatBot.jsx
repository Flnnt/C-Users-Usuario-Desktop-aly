import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material';
import {
  Send as SendIcon,
  Image as ImageIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Delete as DeleteIcon,
  CalendarMonth,
  LocalHospital
} from '@mui/icons-material';
import {
  addMessage,
  addSymptom,
  removeSymptom,
  addImage,
  removeImage,
  toggleAudio,
  setDiagnosis,
  setSuggestedFacility,
  setProcessing,
  setError,
  resetChat,
  selectConversation,
  selectCurrentSymptoms,
  selectUploadedImages,
  selectAudioEnabled,
  selectDiagnosis,
  selectSuggestedFacility,
  selectIsProcessing
} from '../../store/slices/chatbotSlice';

const MEDICAL_PROMPT = `Eres un asistente médico virtual especializado en diagnóstico preliminar y gestión de citas médicas.

Tu objetivo es:
1. Recopilar y analizar información detallada sobre síntomas
2. Procesar y analizar imágenes médicas proporcionadas
3. Realizar un diagnóstico preliminar basado en la evidencia
4. Recomendar especialistas o centros médicos apropiados
5. Gestionar la programación de citas médicas
6. Asignar y gestionar puntos ALY por interacciones

Por favor, mantén un tono profesional pero empático y asegúrate de:
- Hacer preguntas específicas y relevantes sobre los síntomas
- Solicitar imágenes médicas cuando sea apropiado
- Explicar los posibles diagnósticos de manera clara y comprensible
- Enfatizar que tus sugerencias no reemplazan una consulta médica presencial
- Ofrecer recomendaciones de cuidado básico cuando sea apropiado
- Informar sobre los puntos ALY ganados en cada interacción
- Facilitar la programación de citas con especialistas recomendados`;

const mockMedicalFacilities = [
  { id: 1, name: 'Hospital San Juan', specialty: 'General', address: 'Av. Principal 123' },
  { id: 2, name: 'Clínica Santa María', specialty: 'Cardiología', address: 'Calle Médica 456' },
  { id: 3, name: 'Centro Médico Norte', specialty: 'Pediatría', address: 'Jr. Salud 789' }
];

function ChatBot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  
  const conversation = useSelector(selectConversation);
  const currentSymptoms = useSelector(selectCurrentSymptoms);
  const uploadedImages = useSelector(selectUploadedImages);
  const audioEnabled = useSelector(selectAudioEnabled);
  const diagnosis = useSelector(selectDiagnosis);
  const suggestedFacility = useSelector(selectSuggestedFacility);
  const isProcessing = useSelector(selectIsProcessing);

  const [message, setMessage] = useState('');
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  useEffect(() => {
    if (conversation.length === 0) {
      dispatch(addMessage({
        id: Date.now(),
        text: '¡Hola! Soy tu asistente médico virtual. ¿En qué puedo ayudarte hoy?',
        sender: 'bot'
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    dispatch(addMessage({
      id: Date.now(),
      text: message,
      sender: 'user'
    }));

    setMessage('');
    dispatch(setProcessing(true));

    // Simulación de respuesta del chatbot
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        text: 'Entiendo tus síntomas. ¿Podrías decirme hace cuánto tiempo comenzaron y si has notado algún factor que los empeore o mejore?',
        sender: 'bot'
      };
      dispatch(addMessage(botResponse));
      dispatch(setProcessing(false));
    }, 1500);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(addImage({
          id: Date.now(),
          url: e.target.result,
          name: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAppointmentRequest = () => {
    setShowAppointmentDialog(true);
  };

  const handleBookAppointment = (facility) => {
    dispatch(addMessage({
      id: Date.now(),
      text: `Cita programada en ${facility.name}`,
      sender: 'bot'
    }));
    setShowAppointmentDialog(false);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box ref={chatContainerRef} sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
          {conversation.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                  color: msg.sender === 'user' ? 'white' : 'text.primary'
                }}
              >
                <Typography>{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
          {isProcessing && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <IconButton component="span" color="primary">
              <ImageIcon />
            </IconButton>
          </label>
          
          <IconButton onClick={() => dispatch(toggleAudio)} color={audioEnabled ? 'primary' : 'default'}>
            {audioEnabled ? <MicIcon /> : <MicOffIcon />}
          </IconButton>

          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('chatbot.messagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={isProcessing}
          >
            {t('send')}
          </Button>
        </Box>
      </Paper>

      {uploadedImages.length > 0 && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('chatbot.uploadedImages')}
          </Typography>
          <Grid container spacing={2}>
            {uploadedImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image.url}
                    alt={image.name}
                  />
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{image.name}</Typography>
                    <IconButton onClick={() => dispatch(removeImage(image.id))} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      <Dialog open={showAppointmentDialog} onClose={() => setShowAppointmentDialog(false)}>
        <DialogTitle>{t('chatbot.selectFacility')}</DialogTitle>
        <DialogContent>
          <List>
            {mockMedicalFacilities.map((facility) => (
              <ListItem
                key={facility.id}
                button
                onClick={() => handleBookAppointment(facility)}
              >
                <ListItemIcon>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText
                  primary={facility.name}
                  secondary={`${facility.specialty} - ${facility.address}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAppointmentDialog(false)}>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        startIcon={<CalendarMonth />}
        onClick={handleAppointmentRequest}
        sx={{ mt: 2 }}
      >
        {t('chatbot.scheduleAppointment')}
      </Button>
    </Box>
  );
}

export default ChatBot;