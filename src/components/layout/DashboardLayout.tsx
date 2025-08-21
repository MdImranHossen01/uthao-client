import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logOut } from '@/app/features/auth/authSlice';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LucideIcon, LayoutDashboard, Package, PackagePlus, Users, PackageCheck } from 'lucide-react';

// Define the structure for a navigation link
type NavLinkItem = {
  to: string;
  icon: LucideIcon;
  label: string;
};

// Define links for each role
const adminLinks: NavLinkItem[] = [
  { to: '/dashboard/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/users', icon: Users, label: 'Manage Users' },
  { to: '/dashboard/parcels', icon: Package, label: 'All Parcels' },
];

const senderLinks: NavLinkItem[] = [
  { to: '/dashboard/sender', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/create-parcel', icon: PackagePlus, label: 'Create Parcel' },
  { to: '/dashboard/my-parcels', icon: Package, label: 'My Parcels' },
];

const receiverLinks: NavLinkItem[] = [
  { to: '/dashboard/receiver', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/my-deliveries', icon: PackageCheck, label: 'My Deliveries' },
];


export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success('Logged out successfully!');
    navigate('/login');
  };
  
  // Determine which links to show based on user role
  let navLinks: NavLinkItem[] = [];
  if (user?.role === 'admin') navLinks = adminLinks;
  else if (user?.role === 'sender') navLinks = senderLinks;
  else if (user?.role === 'receiver') navLinks = receiverLinks;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Navbar for mobile */}
        <div className="navbar bg-base-100 shadow-md lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Uthao Dashboard</a>
          </div>
          <div className="flex-none">
            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
          </div>
        </div>
        
        {/* Page content here */}
        <main className="p-4 lg:p-8 w-full">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          <li className="text-xl font-bold p-4">Uthao Dashboard</li>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end>
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            </li>
          ))}
          {/* Logout button for desktop sidebar */}
           <li className="mt-auto">
             <button onClick={handleLogout} className="btn btn-ghost w-full justify-start">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}