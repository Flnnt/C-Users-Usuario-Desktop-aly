import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Logo from '../components/common/Logo';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Chat,
  CalendarMonth,
  Folder,
  AccountBalanceWallet,
  Store as StoreIcon,
  AdminPanelSettings,
  Person,
  Language
} from '@mui/icons-material';
import { selectIsAuthenticated, selectCurrentRole } from '../store/slices/authSlice';

const drawerWidth = 240;

function MainLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectCurrentRole);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleLanguageClose();
  };

  const menuItems = [
    { text: t('dashboard'), icon: <Home />, path: '/dashboard', roles: ['patient', 'doctor', 'admin'] },
    { text: t('chatbot'), icon: <Chat />, path: '/chatbot', roles: ['patient'] },
    { text: t('appointments'), icon: <CalendarMonth />, path: '/appointments', roles: ['patient', 'doctor'] },
    { text: t('medicalHistory'), icon: <Folder />, path: '/medical-history', roles: ['patient', 'doctor'] },
    { text: t('alyWallet'), icon: <AccountBalanceWallet />, path: '/aly-wallet', roles: ['patient'] },
    { text: t('store'), icon: <StoreIcon />, path: '/store', roles: ['patient'] },
    { text: t('admin'), icon: <AdminPanelSettings />, path: '/admin', roles: ['admin'] },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          (item.roles.includes(userRole) || !item.roles.length) && (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Logo width={32} height={32} />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ALY
          </Typography>

          <IconButton color="inherit" onClick={handleLanguageClick}>
            <Language />
          </IconButton>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
            <MenuItem onClick={() => changeLanguage('qu')}>Quechua</MenuItem>
            <MenuItem onClick={() => changeLanguage('ay')}>Aymara</MenuItem>
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          </Menu>

          {isAuthenticated ? (
            <IconButton color="inherit" onClick={() => navigate('/profile')}>
              <Person />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              {t('login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: '64px'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;