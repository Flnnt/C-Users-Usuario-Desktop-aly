import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import {
  Chat,
  LocalHospital,
  AccountBalanceWallet,
  Store as StoreIcon,
  Security,
  Translate
} from '@mui/icons-material';

const features = [
  {
    icon: <Chat sx={{ fontSize: 40 }} />,
    title: 'chatbot.title',
    description: 'chatbot.description'
  },
  {
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    title: 'appointments.title',
    description: 'appointments.description'
  },
  {
    icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />,
    title: 'wallet.title',
    description: 'wallet.description'
  },
  {
    icon: <StoreIcon sx={{ fontSize: 40 }} />,
    title: 'store.title',
    description: 'store.description'
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'security.title',
    description: 'security.description'
  },
  {
    icon: <Translate sx={{ fontSize: 40 }} />,
    title: 'languages.title',
    description: 'languages.description'
  }
];

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 12, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {t('welcome')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t('home.subtitle')}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            {t('register')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            {t('login')}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {t(feature.title)}
                </Typography>
                <Typography color="text.secondary">
                  {t(feature.description)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {t('home.startNow')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('home.startDescription')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/chatbot')}
        >
          {t('home.startButton')}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;