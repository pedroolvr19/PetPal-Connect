import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User as UserEntity } from "@/entities/User";
import eventEmitter from "@/components/utils/events";
import { 
  Heart, Home, Plus, PawPrint, CalendarDays, 
  LogOut, Menu, X, Settings, HeartPulse, Pill 
} from "lucide-react";

function NavLink({ to, icon: Icon, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 mb-1
        ${isActive
          ? 'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
      <span>{children}</span>
    </Link>
  );
}

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile automaticamente quando muda de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetchUser();
    const handleUserUpdate = (u) => setUser(u);
    eventEmitter.subscribe('userUpdated', handleUserUpdate);
    return () => eventEmitter.unsubscribe('userUpdated', handleUserUpdate);
  }, []);

  const fetchUser = async () => {
    try {
      const fetchedUser = await UserEntity.me();
      setUser(fetchedUser);
    } catch (e) {
      console.error("Erro user", e);
    }
  };

  const handleLogout = async () => {
    await UserEntity.logout();
  };

  const navItems = [
    { name: "Dashboard", label: "Meus Pets", icon: Home, url: "/dashboard" },
    { name: "AdicionarPet", label: "Adicionar Pet", icon: Plus, url: "/adicionarpet" },
    { name: "Calendario", label: "Calendário", icon: CalendarDays, url: "/calendario" },
    { name: "GestaoDeMedicamentos", label: "Medicamentos", icon: Pill, url: "/gestaodemedicamentos" },
    { name: "Emergencias", label: "Emergências", icon: HeartPulse, url: "/emergencias" },
    { name: "MeuPerfil", label: "Meu Perfil", icon: Settings, url: "/meuperfil" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-white">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <PawPrint className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-lg leading-tight">PetPal Connect</h2>
          <p className="text-xs text-gray-500">Saúde e Bem-estar</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 bg-white">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 mb-2">
          Menu Principal
        </h3>
        {navItems.map((item) => (
          <NavLink key={item.url} to={item.url} icon={item.icon}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé Usuário */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.foto_url || `https://ui-avatars.com/api/?name=${user.full_name}&background=random`}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-red-500">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="animate-pulse h-10 bg-gray-200 rounded-lg w-full"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. SIDEBAR DESKTOP (Escondido no Mobile) */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white h-full fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* 2. HEADER MOBILE (Só aparece no Mobile) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-800">PetPal Connect</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg active:bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* 3. MENU MOBILE (Overlay + Drawer) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Fundo Escuro (Clica para fechar) */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Gaveta do Menu (Branca) */}
          <div className="relative w-[80%] max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="absolute top-2 right-2">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* 4. CONTEÚDO PRINCIPAL */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 h-full overflow-y-auto scroll-smooth">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}