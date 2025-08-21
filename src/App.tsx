import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SenderDashboard from './pages/dashboard/SenderDashboard';
import ReceiverDashboard from './pages/dashboard/ReceiverDashboard';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import MyParcels from './pages/dashboard/MyParcels';
import CreateParcel from './pages/dashboard/CreateParcel';
import AllParcels from './pages/dashboard/AllParcels';
import ManageUsers from './pages/dashboard/ManageUsers';
import MyDeliveries from './pages/dashboard/MyDeliveries';
import Register from './pages/Register';
import PublicLayout from './components/layout/PublicLayout'; // Import new layout
import HomePage from './pages/Home'; // Import new page
import AboutPage from './pages/About'; // Import new page

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardIndex />} />
        
        {/* Role-specific homepages */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="sender" element={<SenderDashboard />} />
        <Route path="receiver" element={<ReceiverDashboard />} />
        
        {/* Sender-specific pages */}
        <Route path="my-parcels" element={<MyParcels />} />
        <Route path="create-parcel" element={<CreateParcel />} />
        
        {/* Admin-specific pages */}
        <Route path="parcels" element={<AllParcels />} />
        <Route path="users" element={<ManageUsers />} />
        
        {/* Receiver-specific pages */}
        <Route path="my-deliveries" element={<MyDeliveries />} />
      </Route>
    </Routes>
  );
}

export default App;