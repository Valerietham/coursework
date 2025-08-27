import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import NavigationBar from './components/NavigationBar';

import LandingPage from './pages/LandingPage'; // Public route
import Discover from './pages/Discover';
import Likes from './pages/Likes';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import CatDetails from './pages/CatDetails';
import Page404 from './pages/Page404';

function App() {
  return (
    <>
      <Router>
        <main className="md:pl-40 pb-20 md:pb-0">
          <Routes>
            {/* Public route - Landing page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={<Page404 />} />

            {/* Protected routes - All other pages */}
            <Route
              path="/discover"
              element={
                <ProtectedRoute>
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route
              path="/likes"
              element={
                <ProtectedRoute>
                  <Likes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancel"
              element={
                <ProtectedRoute>
                  <Cancel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cats/:id"
              element={
                <ProtectedRoute>
                  <CatDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {/* Navigation bar - only show on protected routes */}
        <Routes>
          <Route path="/" element={null} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <NavigationBar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
