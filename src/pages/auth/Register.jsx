import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import { setCredentials, setVerificationData } from '../../store/slices/authSlice';

const steps = ['personal.info', 'role.selection', 'credentials.verification'];

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    dni: Yup.string()
      .matches(/^\d{8}$/, t('validation.dniFormat'))
      .required(t('validation.required')),
    name: Yup.string()
      .min(2, t('validation.nameMin'))
      .required(t('validation.required')),
    email: Yup.string()
      .email(t('validation.email'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(8, t('validation.passwordMin'))
      .matches(/[a-zA-Z]/, t('validation.passwordLetters'))
      .matches(/\d/, t('validation.passwordNumbers'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.passwordMatch'))
      .required(t('validation.required')),
    role: Yup.string()
      .oneOf(['patient', 'doctor', 'admin'], t('validation.roleValid'))
      .required(t('validation.required')),
    professionalId: Yup.string()
      .when('role', {
        is: 'doctor',
        then: Yup.string().required(t('validation.professionalIdRequired'))
      }),
    institutionCode: Yup.string()
      .when('role', {
        is: 'admin',
        then: Yup.string().required(t('validation.institutionCodeRequired'))
      })
  });

  const formik = useFormik({
    initialValues: {
      dni: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
      professionalId: '',
      institutionCode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de registro
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: '1',
                dni: values.dni,
                name: values.name,
                email: values.email,
                role: values.role
              },
              token: 'demo-token-123'
            });
          }, 1000);
        });

        dispatch(setCredentials({
          user: response.user,
          token: response.token,
          role: response.user.role
        }));

        // Si es médico o administrador, establecer datos de verificación
        if (['doctor', 'admin'].includes(values.role)) {
          dispatch(setVerificationData({
            role: values.role,
            verified: false,
            professionalId: values.professionalId,
            institutionCode: values.institutionCode
          }));
          navigate('/verify-credentials');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        setError(t('register.error'));
      } finally {
        setLoading(false);
      }
    }
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              margin="normal"
              fullWidth
              id="dni"
              name="dni"
              label={t('register.dni')}
              value={formik.values.dni}
              onChange={formik.handleChange}
              error={formik.touched.dni && Boolean(formik.errors.dni)}
              helperText={formik.touched.dni && formik.errors.dni}
            />
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label={t('register.name')}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label={t('register.email')}
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">{t('register.role')}</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="patient">{t('roles.patient')}</MenuItem>
                <MenuItem value="doctor">{t('roles.doctor')}</MenuItem>
                <MenuItem value="admin">{t('roles.admin')}</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              )}
            </FormControl>
            {formik.values.role === 'doctor' && (
              <TextField
                margin="normal"
                fullWidth
                id="professionalId"
                name="professionalId"
                label={t('register.professionalId')}
                value={formik.values.professionalId}
                onChange={formik.handleChange}
                error={formik.touched.professionalId && Boolean(formik.errors.professionalId)}
                helperText={formik.touched.professionalId && formik.errors.professionalId}
              />
            )}
            {formik.values.role === 'admin' && (
              <TextField
                margin="normal"
                fullWidth
                id="institutionCode"
                name="institutionCode"
                label={t('register.institutionCode')}
                value={formik.values.institutionCode}
                onChange={formik.handleChange}
                error={formik.touched.institutionCode && Boolean(formik.errors.institutionCode)}
                helperText={formik.touched.institutionCode && formik.errors.institutionCode}
              />
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label={t('register.password')}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label={t('register.confirmPassword')}
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('register.title')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3, width: '100%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(`register.steps.${label}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
            >
              {t('common.back')}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : t('register.submit')}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
              >
                {t('common.next')}
              </Button>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/login" variant="body2">
            {t('register.haveAccount')}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;