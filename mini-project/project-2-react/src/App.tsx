import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import Discover from './pages/Discover';
import Likes from './pages/Likes';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main>
            <Routes>
              {/* Public route - Login page */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes - Require authentication */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Discover />
                  </PrivateRoute>
                }
              />
              <Route
                path="/likes"
                element={
                  <PrivateRoute>
                    <Likes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          {/* Navigation bar - only show on protected routes */}
          <Routes>
            <Route path="/login" element={null} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <NavigationBar />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
