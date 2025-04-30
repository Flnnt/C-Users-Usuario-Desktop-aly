import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Divider,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocalHospital,
  Psychology,
  Medication,
  SpaOutlined,
  FitnessCenter
} from '@mui/icons-material';

function Store() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Productos de ejemplo
  const products = [
    {
      id: 1,
      name: 'Consulta Médica General',
      description: 'Consulta médica general con especialistas certificados',
      price: 50,
      discountPrice: 40,
      category: 'medical',
      image: 'https://via.placeholder.com/300x200?text=Consulta+Médica',
      rating: 4.5,
      reviews: 120
    },
    {
      id: 2,
      name: 'Terapia Psicológica',
      description: 'Sesión de terapia psicológica con profesionales calificados',
      price: 60,
      discountPrice: null,
      category: 'psychology',
      image: 'https://via.placeholder.com/300x200?text=Terapia+Psicológica',
      rating: 4.8,
      reviews: 85
    },
    {
      id: 3,
      name: 'Análisis de Sangre Completo',
      description: 'Análisis completo de sangre con resultados en 24 horas',
      price: 35,
      discountPrice: 30,
      category: 'laboratory',
      image: 'https://via.placeholder.com/300x200?text=Análisis+de+Sangre',
      rating: 4.2,
      reviews: 64
    },
    {
      id: 4,
      name: 'Masaje Terapéutico',
      description: 'Sesión de masaje terapéutico para aliviar tensiones',
      price: 45,
      discountPrice: null,
      category: 'wellness',
      image: 'https://via.placeholder.com/300x200?text=Masaje+Terapéutico',
      rating: 4.6,
      reviews: 92
    },
    {
      id: 5,
      name: 'Plan Nutricional Personalizado',
      description: 'Plan nutricional personalizado con seguimiento mensual',
      price: 70,
      discountPrice: 55,
      category: 'nutrition',
      image: 'https://via.placeholder.com/300x200?text=Plan+Nutricional',
      rating: 4.4,
      reviews: 78
    },
    {
      id: 6,
      name: 'Entrenamiento Personal',
      description: '4 sesiones de entrenamiento personal con instructor certificado',
      price: 80,
      discountPrice: null,
      category: 'fitness',
      image: 'https://via.placeholder.com/300x200?text=Entrenamiento+Personal',
      rating: 4.7,
      reviews: 56
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenProductDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    // Podría mostrar una notificación aquí
  };

  const filteredProducts = products.filter(product => {
    // Filtrar por categoría según la pestaña seleccionada
    if (tabValue === 1 && product.category !== 'medical') return false;
    if (tabValue === 2 && product.category !== 'psychology') return false;
    if (tabValue === 3 && product.category !== 'laboratory') return false;
    if (tabValue === 4 && product.category !== 'wellness' && product.category !== 'fitness') return false;
    
    // Filtrar por búsqueda
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             product.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'medical':
        return <LocalHospital color="primary" />;
      case 'psychology':
        return <Psychology color="primary" />;
      case 'laboratory':
        return <Medication color="primary" />;
      case 'wellness':
        return <SpaOutlined color="primary" />;
      case 'fitness':
        return <FitnessCenter color="primary" />;
      default:
        return <LocalHospital color="primary" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {t('store')}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => alert(`${cart.length} items en el carrito`)}
        >
          Carrito ({cart.length})
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar servicios..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Todos" />
          <Tab label="Consultas Médicas" />
          <Tab label="Psicología" />
          <Tab label="Laboratorio" />
          <Tab label="Bienestar" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    {getCategoryIcon(product.category)}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {product.discountPrice ? (
                      <>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {product.discountPrice} ALY
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                          {product.price} ALY
                        </Typography>
                        <Chip 
                          label={`-${Math.round((1 - product.discountPrice / product.price) * 100)}%`} 
                          color="error" 
                          size="small" 
                          sx={{ ml: 1 }} 
                        />
                      </>
                    ) : (
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {product.price} ALY
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenProductDialog(product)}>
                    Ver detalles
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Añadir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron servicios que coincidan con tu búsqueda
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Diálogo de detalles del producto */}
      {selectedProduct && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  style={{ width: '100%', borderRadius: '8px' }} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  {selectedProduct.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={selectedProduct.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {selectedProduct.rating} ({selectedProduct.reviews} reseñas)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {selectedProduct.discountPrice ? (
                    <>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {selectedProduct.discountPrice} ALY
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        {selectedProduct.price} ALY
                      </Typography>
                      <Chip 
                        label={`-${Math.round((1 - selectedProduct.discountPrice / selectedProduct.price) * 100)}%`} 
                        color="error" 
                        size="small" 
                        sx={{ ml: 1 }} 
                      />
                    </>
                  ) : (
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {selectedProduct.price} ALY
                    </Typography>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Detalles del servicio:
                </Typography>
                
                <Typography variant="body2" paragraph>
                  • Disponibilidad inmediata
                </Typography>
                <Typography variant="body2" paragraph>
                  • Válido por 30 días desde la compra
                </Typography>
                <Typography variant="body2" paragraph>
                  • Cancelación gratuita hasta 24 horas antes
                </Typography>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    handleCloseDialog();
                  }}
                  sx={{ mt: 2 }}
                >
                  Añadir al carrito
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<FavoriteBorderIcon />}
                  sx={{ mt: 1 }}
                >
                  Añadir a favoritos
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default Store;