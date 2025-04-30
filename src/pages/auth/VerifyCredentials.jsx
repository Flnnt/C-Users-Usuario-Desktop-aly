import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';
import {
  selectVerificationData,
  setVerified,
  selectCurrentRole
} from '../../store/slices/authSlice';

function VerifyCredentials() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verificationData = useSelector(selectVerificationData);
  const role = useSelector(selectCurrentRole);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    const verifyCredentials = async () => {
      try {
        // Simulación de verificación de credenciales
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulación de validación exitosa
        const isValid = true;

        if (isValid) {
          setVerificationStatus('success');
          dispatch(setVerified());
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setVerificationStatus('error');
          setError(t('verification.invalidCredentials'));
        }
      } catch (err) {
        setVerificationStatus('error');
        setError(t('verification.error'));
      } finally {
        setLoading(false);
      }
    };

    if (verificationData && !verificationData.verified) {
      verifyCredentials();
    } else {
      navigate('/dashboard');
    }
  }, [dispatch, navigate, t, verificationData]);

  const getVerificationMessage = () => {
    if (role === 'doctor') {
      return t('verification.doctorMessage');
    }
    return t('verification.adminMessage');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <VerifiedUser
            sx={{
              fontSize: 64,
              color: verificationStatus === 'success' ? 'success.main' : 'primary.main',
              mb: 2
            }}
          />
          <Typography component="h1" variant="h5" gutterBottom>
            {t('verification.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
            {getVerificationMessage()}
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {t('verification.processing')}
              </Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={() => navigate('/register')}>
                    {t('common.tryAgain')}
                  </Button>
                }
              >
                {error}
              </Alert>
            </Box>
          )}

          {verificationStatus === 'success' && (
            <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
              {t('verification.success')}
            </Alert>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default VerifyCredentials;