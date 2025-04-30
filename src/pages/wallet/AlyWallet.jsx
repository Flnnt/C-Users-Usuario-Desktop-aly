import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  AccountBalanceWallet,
  ArrowUpward,
  ArrowDownward,
  History as HistoryIcon,
  LocalHospital,
  Store as StoreIcon,
  Add as AddIcon,
  ContentCopy as ContentCopyIcon
} from '@mui/icons-material';

function AlyWallet() {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(250);
  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'earn',
      amount: 50,
      description: 'Consulta médica completada',
      date: '10/09/2023',
      category: 'medical'
    },
    {
      id: 2,
      type: 'spend',
      amount: 20,
      description: 'Descuento en farmacia',
      date: '05/09/2023',
      category: 'store'
    },
    {
      id: 3,
      type: 'earn',
      amount: 100,
      description: 'Bono por registro',
      date: '01/09/2023',
      category: 'system'
    },
    {
      id: 4,
      type: 'spend',
      amount: 30,
      description: 'Reserva de cita',
      date: '25/08/2023',
      category: 'appointment'
    }
  ]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAmount('');
  };

  const handleAddFunds = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    
    setLoading(true);
    
    // Simulación de proceso de carga
    setTimeout(() => {
      const newTransaction = {
        id: Date.now(),
        type: 'earn',
        amount: Number(amount),
        description: 'Recarga de puntos',
        date: new Date().toLocaleDateString(),
        category: 'system'
      };
      
      setTransactions([newTransaction, ...transactions]);
      setBalance(prevBalance => prevBalance + Number(amount));
      setLoading(false);
      handleCloseDialog();
    }, 1500);
  };

  const copyWalletId = () => {
    // Simulación de copia al portapapeles
    alert('ID de billetera copiado al portapapeles: ALY-1234-5678-90');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('alyWallet')}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Tarjeta de balance */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWallet sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Mi Billetera ALY</Typography>
              </Box>
              
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                {balance} ALY
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>ID: ALY-1234-5678-90</Typography>
                <IconButton size="small" onClick={copyWalletId} sx={{ color: 'white' }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                fullWidth
                sx={{ mt: 2 }}
              >
                Añadir Puntos
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Tarjetas de información */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>¿Qué son los puntos ALY?</Typography>
                <Typography variant="body2">
                  Los puntos ALY son la moneda virtual de nuestra plataforma. Puedes ganarlos completando consultas, 
                  siguiendo tratamientos y participando en programas de salud. Úsalos para obtener descuentos en 
                  servicios médicos y productos de nuestra tienda.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Cómo ganar más puntos</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalHospital color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Completa consultas médicas</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HistoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Actualiza tu historial médico</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StoreIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Compra en nuestra tienda de servicios</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Historial de transacciones */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Historial de Transacciones</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell align="right">Puntos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Chip 
                          size="small" 
                          label={{
                            'medical': 'Médico',
                            'store': 'Tienda',
                            'system': 'Sistema',
                            'appointment': 'Cita'
                          }[transaction.category]}
                          color={{
                            'medical': 'primary',
                            'store': 'secondary',
                            'system': 'info',
                            'appointment': 'warning'
                          }[transaction.category]}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {transaction.type === 'earn' ? (
                            <ArrowUpward fontSize="small" color="success" sx={{ mr: 1 }} />
                          ) : (
                            <ArrowDownward fontSize="small" color="error" sx={{ mr: 1 }} />
                          )}
                          <Typography
                            color={transaction.type === 'earn' ? 'success.main' : 'error.main'}
                            fontWeight="bold"
                          >
                            {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} ALY
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Diálogo para añadir puntos */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Añadir Puntos ALY</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ingresa la cantidad de puntos ALY que deseas añadir a tu billetera.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Cantidad"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>ALY</Typography>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleAddFunds} 
            variant="contained" 
            disabled={!amount || isNaN(amount) || Number(amount) <= 0 || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Añadir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AlyWallet;