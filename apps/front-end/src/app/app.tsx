// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { useState } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { User } from './services/user.service';
import {
  Container,
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export function App() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setShowUserForm(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleFormSuccess = () => {
    setShowUserForm(false);
    setSelectedUser(undefined);
  };

  const handleFormCancel = () => {
    setShowUserForm(false);
    setSelectedUser(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Management
            </Typography>
            <Button
              color="inherit"
              startIcon={<AddIcon />}
              onClick={handleCreateUser}
            >
              Add User
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          {showUserForm ? (
            <UserForm
              user={selectedUser}
              onSave={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          ) : (
            <UserList onEditUser={handleEditUser} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
