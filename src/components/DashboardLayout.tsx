
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { 
  MessageSquareText, 
  Search, 
  BookOpen, 
  Sparkles, 
  Users,
  LayoutDashboard,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const DashboardLayout: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    // Clear authentication from localStorage
    localStorage.removeItem('isAuthenticated');
    // Redirect to home page
    navigate('/');
  };
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Communication",
      path: "/dashboard/communication",
      icon: MessageSquareText
    },
    {
      name: "Screening",
      path: "/dashboard/screening",
      icon: Search
    },
    {
      name: "Therapy",
      path: "/dashboard/therapy",
      icon: BookOpen
    },
    {
      name: "Tale Therapy",
      path: "/dashboard/tale-therapy",
      icon: Sparkles
    },
    {
      name: "Crisis Support",
      path: "/dashboard/crisis-support",
      icon: AlertCircle
    }
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-agam-blue">AGAM</h2>
          <p className="text-sm text-gray-500">
            {language === 'en' ? 'Autism Care Platform' : 'ஆட்டிசம் பராமரிப்பு தளம்'}
          </p>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                  isActive 
                    ? "bg-agam-blue/10 text-agam-blue" 
                    : "text-gray-700 hover:bg-gray-100",
                  language === "ta" && "font-tamil"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className={cn(language === "ta" && "font-tamil")}>
              {language === 'en' ? 'Log Out' : 'வெளியேறு'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="md:hidden">
            <h2 className="text-xl font-bold text-agam-blue">AGAM</h2>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="w-8 h-8 rounded-full bg-agam-blue/10 text-agam-blue flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </header>
        
        {/* Mobile navigation */}
        <div className="md:hidden flex overflow-x-auto border-b border-gray-200 bg-white">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center px-4 py-2 text-xs font-medium flex-shrink-0",
                  isActive 
                    ? "text-agam-blue border-b-2 border-agam-blue" 
                    : "text-gray-700",
                  language === "ta" && "font-tamil"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
