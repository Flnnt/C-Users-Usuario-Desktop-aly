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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { setCredentials, setVerificationData } from '../../store/slices/authSlice';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.email'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(8, t('validation.passwordMin'))
      .required(t('validation.required'))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de llamada a API
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: '1',
                email: values.email,
                name: 'Usuario Demo',
                role: 'patient'
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

        // Si el usuario es médico o administrador, solicitar verificación adicional
        if (['doctor', 'admin'].includes(response.user.role)) {
          dispatch(setVerificationData({
            role: response.user.role,
            verified: false
          }));
          navigate('/verify-credentials');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        setError(t('login.error'));
      } finally {
        setLoading(false);
      }
    }
  });

  const handleRecoverySubmit = async () => {
    setLoading(true);
    try {
      // Simulación de envío de correo de recuperación
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRecoverySuccess(true);
      setTimeout(() => {
        setShowRecoveryDialog(false);
        setRecoverySuccess(false);
        setRecoveryEmail('');
      }, 3000);
    } catch (err) {
      setError(t('recovery.error'));
    } finally {
      setLoading(false);
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login.title')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label={t('login.email')}
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label={t('login.password')}
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t('login.submit')}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setShowRecoveryDialog(true)}
            >
              {t('login.forgotPassword')}
            </Link>
            <Link component={RouterLink} to="/register" variant="body2">
              {t('login.register')}
            </Link>
          </Box>
        </Box>
      </Box>

      <Dialog open={showRecoveryDialog} onClose={() => setShowRecoveryDialog(false)}>
        <DialogTitle>{t('recovery.title')}</DialogTitle>
        <DialogContent>
          {recoverySuccess ? (
            <Alert severity="success">{t('recovery.success')}</Alert>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="recovery-email"
              label={t('recovery.email')}
              type="email"
              fullWidth
              variant="outlined"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRecoveryDialog(false)}>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleRecoverySubmit}
            disabled={!recoveryEmail || loading || recoverySuccess}
          >
            {loading ? <CircularProgress size={24} /> : t('recovery.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;