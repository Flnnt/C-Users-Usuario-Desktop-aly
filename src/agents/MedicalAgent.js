import { Agent } from '@google-cloud/agent-engine';

// Funciones de herramientas para el agente
const getAvailableSlots = async (doctorId, date) => {
  // Simulación de slots disponibles
  const slots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: false }
  ];
  return {
    status: 'success',
    slots: slots.filter(slot => slot.available)
  };
};

const scheduleAppointment = async (doctorId, patientId, dateTime) => {
  // Simulación de programación de cita
  return {
    status: 'success',
    appointment: {
      id: Math.random().toString(36).substr(2, 9),
      doctorId,
      patientId,
      dateTime,
      points: 100 // Puntos ALY otorgados por la cita
    }
  };
};

const getMedicalHistory = async (patientId) => {
  // Simulación de historial médico
  return {
    status: 'success',
    history: [
      {
        date: '2024-01-15',
        type: 'consultation',
        diagnosis: 'Gripe común',
        treatment: 'Reposo y medicamentos',
        points: 50
      },
      {
        date: '2024-02-01',
        type: 'follow-up',
        diagnosis: 'Recuperación satisfactoria',
        treatment: 'Alta médica',
        points: 30
      }
    ]
  };
};

// Función para procesar imágenes médicas
const processImage = async (imageData) => {
  // Simulación de procesamiento de imagen
  return {
    status: 'success',
    analysis: {
      type: 'medical_image',
      findings: 'Imagen analizada correctamente',
      confidence: 0.85,
      points: 75 // Puntos ALY por subir imagen
    }
  };
};

// Función para diagnóstico preliminar
const performDiagnosis = async (symptoms, imageAnalysis = null) => {
  // Simulación de diagnóstico
  return {
    status: 'success',
    diagnosis: {
      condition: 'Evaluación preliminar realizada',
      confidence: 0.75,
      recommendations: ['Consulta médica', 'Exámenes adicionales'],
      points: 150 // Puntos ALY por diagnóstico
    }
  };
};

// Configuración del agente médico
export const medicalAgent = new Agent({
  name: 'medical_assistant',
  model: 'gemini-2.0-flash',
  description: 'Agente para diagnóstico preliminar y gestión médica',
  instruction: `Eres un asistente médico AI especializado en:
    - Análisis de síntomas y diagnóstico preliminar
    - Procesamiento de imágenes médicas
    - Programación de citas médicas
    - Consulta de disponibilidad de doctores
    - Revisión de historiales médicos
    - Gestión de puntos ALY por interacciones
    Debes mantener un tono profesional y empático en tus respuestas.`,
  tools: [getAvailableSlots, scheduleAppointment, getMedicalHistory, processImage, performDiagnosis]
});