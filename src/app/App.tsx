import { useState, useEffect } from 'react';
import { Bell, MapPin, AlertTriangle, CheckCircle, Clock, Menu, LogOut, FileText, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import LoginScreen from './components/LoginScreen';
import RoadwaySelector, { type Highway } from './components/RoadwaySelector';
import Dashboard from './components/Dashboard';
import SensorDetails from './components/SensorDetails';
import ReportScreen from './components/ReportScreen';
import NotificationsPanel from './components/NotificationsPanel';
import OperatorDashboard from './components/OperatorDashboard';
import OperatorWorkScreen, { type WorkCompletionData } from './components/OperatorWorkScreen';
import {
  highways,
  sensorsByHighway,
  mockNotifications,
  mockOccurrences,
  mockInterventions
} from '../mocks/mockData';
import type { Occurrence, Intervention } from '../mocks/mockData';

export type SensorStatus = 'critical' | 'warning' | 'normal' | 'maintenance';
export type UserRole = 'gestor' | 'operador';

export interface Sensor {
  id: string;
  name: string;
  km: number;
  side: 'Norte' | 'Sul';
  height: number; // em cm
  lastMowing: string;
  status: SensorStatus;
  lat: number;
  lng: number;
  growthRate: number; // cm por semana
  assignedTo?: string; // nome do operador
  requestedBy?: string; // nome do gestor
}

export interface Notification {
  id: string;
  sensorId: string;
  sensorName: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info';
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('gestor');
  const [selectedHighway, setSelectedHighway] = useState<Highway | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: 'Mário Silva', role: 'Supervisor de Operações' });

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Usamos um módulo de mocks dedicado para representar cenários reais de rodovias Motiva

  const [sensorsByHighwayState, setSensorsByHighwayState] = useState<Record<string, Sensor[]>>(sensorsByHighway);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [occurrences, setOccurrences] = useState<Occurrence[]>(mockOccurrences);
  const [interventions, setInterventions] = useState<Intervention[]>(mockInterventions);

  const getSensorsForHighway = (highwayId: string): Sensor[] => {
    return sensorsByHighwayState[highwayId] ?? [];
  };

  const getAllSensors = (): Sensor[] => {
    return Object.values(sensorsByHighwayState).flat();
  };

  const getPrioritySummary = (sensorList: Sensor[]) => {
    const critical = sensorList.filter((sensor) => sensor.status === 'critical').length;
    const warning = sensorList.filter((sensor) => sensor.status === 'warning').length;
    const maintenance = sensorList.filter((sensor) => sensor.status === 'maintenance').length;
    const urgent = sensorList.filter((sensor) => sensor.status === 'critical' || sensor.status === 'warning');

    return {
      critical,
      warning,
      maintenance,
      urgentCount: urgent.length,
      topPriority: urgent[0] ?? undefined
    };
  };

  const displayHighways = highways.map((highway) => {
    const currentSensors = getSensorsForHighway(highway.id);
    const criticalCount = currentSensors.filter((s) => s.status === 'critical').length;
    const warningCount = currentSensors.filter((s) => s.status === 'warning').length;
    const totalSensors = currentSensors.length || highway.totalSensors;
    const avgHeight = currentSensors.length > 0
      ? Math.round(currentSensors.reduce((sum, sensor) => sum + sensor.height, 0) / currentSensors.length)
      : highway.avgHeight;

    return {
      ...highway,
      criticalCount,
      warningCount,
      totalSensors,
      avgHeight
    };
  });

  const routeSegments = location.pathname.split('/').filter(Boolean);
  const routeHighwayId = routeSegments[0] === 'highways' && routeSegments[1] !== 'undefined'
    ? routeSegments[1]
    : undefined;
  const routeSensors = routeHighwayId ? getSensorsForHighway(routeHighwayId) : sensors;
  const activeHighway = highways.find((highway) => highway.id === routeHighwayId) ?? selectedHighway;
  const currentScreen = location.pathname === '/highways'
    ? 'highway-select'
    : location.pathname.endsWith('/report')
      ? 'report'
      : location.pathname.startsWith('/sensors/')
        ? 'details'
        : location.pathname.startsWith('/operator/tasks/')
          ? 'operator-work'
          : 'dashboard';

  const getSensorById = (sensorId: string): Sensor | undefined => {
    return getAllSensors().find((sensor) => sensor.id === sensorId);
  };

  const routeSensor = routeSegments[0] === 'sensors' || routeSegments[0] === 'operator'
    ? getSensorById(routeSegments.at(-1) ?? '')
    : undefined;

  const getHighwayIdBySensorId = (sensorId: string): string | undefined => {
    return Object.entries(sensorsByHighwayState).find(([, list]) =>
      list.some((sensor) => sensor.id === sensorId)
    )?.[0];
  };

  const updateSensorById = (sensorId: string, updates: Partial<Sensor>) => {
    setSensorsByHighwayState((prev) => {
      let changed = false;
      const next: Record<string, Sensor[]> = {};

      for (const [key, list] of Object.entries(prev)) {
        const updatedList = list.map((sensor) => {
          if (sensor.id !== sensorId) return sensor;
          changed = true;
          return { ...sensor, ...updates };
        });

        next[key] = updatedList;
      }

      return changed ? next : prev;
    });
  };

  // Simulação de notificação push
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        const criticalSensors = sensors.filter(s => s.status === 'critical');
        if (criticalSensors.length > 0) {
          toast.error(`${criticalSensors.length} trecho(s) com altura crítica!`, {
            description: 'Clique para ver detalhes',
            duration: 5000,
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, sensors]);

  useEffect(() => {
    if (userRole === 'gestor' && selectedHighway) {
      setSensors(getSensorsForHighway(selectedHighway.id));
    }

    if (userRole === 'operador') {
      setSensors(getAllSensors());
    }
  }, [userRole, selectedHighway, sensorsByHighwayState]);

  const handleLogin = (username: string, password: string, role: UserRole) => {
    // Simulação de autenticação
    if (username && password) {
      setIsAuthenticated(true);
      setUserRole(role);

      if (role === 'gestor') {
        setUser({ name: username, role: 'Supervisor de Operações' });
        navigate('/highways');
      } else {
        setUser({ name: username, role: 'Operador de Campo' });
        if (!selectedHighway) {
          setSelectedHighway(highways[0]); // primeira rodovia por padrão apenas se ainda não houver seleção
        }
        setSensors(getAllSensors());
        navigate('/operator/tasks');
      }

      toast.success(`Login realizado como ${role === 'gestor' ? 'Gestor' : 'Operador'}!`);
    }
  };

  const handleSelectHighway = (highway: Highway) => {
    setSelectedHighway(highway);
    setSensors(getSensorsForHighway(highway.id));
    navigate(`/highways/${highway.id}`);
    toast.success(`Rodovia selecionada: ${highway.name}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    toast.info('Sessão encerrada');
  };

  const handleSensorClick = (sensor: Sensor) => {
    navigate(`/sensors/${sensor.id}`);
  };

  const handleUpdateSensorStatus = (sensorId: string, newStatus: SensorStatus) => {
    const sensor = getSensorById(sensorId);
    const highwayId = getHighwayIdBySensorId(sensorId);

    updateSensorById(sensorId, {
      status: newStatus,
      assignedTo: newStatus === 'maintenance' ? 'Operador de Campo' : undefined,
      requestedBy: newStatus === 'maintenance' ? user.name : undefined
    });

    setSensors(prev =>
      prev.map(s => s.id === sensorId ? {
        ...s,
        status: newStatus,
        assignedTo: newStatus === 'maintenance' ? 'Operador de Campo' : s.assignedTo,
        requestedBy: newStatus === 'maintenance' ? user.name : s.requestedBy
      } : s)
    );

    if (sensor) {
      const alertType = newStatus === 'critical' ? 'critical' : newStatus === 'warning' ? 'warning' : 'info';
      const alertMessage = newStatus === 'critical'
        ? `Trecho crítico: ${sensor.name} em ${sensor.height}cm. Ação imediata necessária.`
        : newStatus === 'warning'
          ? `Trecho em atenção: ${sensor.name} está acima do limite recomendado.`
          : newStatus === 'maintenance'
            ? `Tarefa de roçada designada para ${sensor.name}.`
            : `Status de ${sensor.name} atualizado para normal.`;

      setNotifications(prev => [
        {
          id: `n-${Date.now()}`,
          sensorId,
          sensorName: sensor.name,
          message: alertMessage,
          timestamp: new Date().toISOString(),
          read: false,
          type: alertType
        },
        ...prev
      ]);
    }

    if (newStatus === 'maintenance' && sensor) {
      setInterventions(prev => [
        ...prev,
        {
          id: `i-${Date.now()}`,
          sensorId,
          highwayId: highwayId ?? 'unknown',
          km: sensor.km,
          date: new Date().toISOString().split('T')[0],
          team: 'Equipe Operacional',
          action: 'Roçada designada pelo gestor',
          result: 'Aguardando execução',
          status: 'scheduled',
          beforeHeight: sensor.height
        }
      ]);
    }

    toast.success(newStatus === 'critical'
      ? 'Alerta crítico registrado!'
      : newStatus === 'warning'
        ? 'Aviso de atenção registrado.'
        : 'Status atualizado com sucesso!');
  };

  const handleWorkCompletion = (data: WorkCompletionData) => {
    const sensor = getSensorById(data.sensorId);

    updateSensorById(data.sensorId, {
      status: 'normal',
      height: data.heightAfter,
      lastMowing: new Date().toISOString().split('T')[0],
      assignedTo: undefined
    });
    setSensors(prev =>
      prev.map(s => s.id === data.sensorId ? {
        ...s,
        status: 'normal',
        height: data.heightAfter,
        lastMowing: new Date().toISOString().split('T')[0],
        assignedTo: undefined
      } : s)
    );

    setInterventions(prev => prev.map((item) =>
      item.sensorId === data.sensorId
        ? {
            ...item,
            status: 'completed',
            result: `Concluído pelo operador: ${data.comments || 'sem observações'}`,
            afterHeight: data.heightAfter,
            beforeHeight: data.heightBefore
          }
        : item
    ));

    if (sensor) {
      setNotifications(prev => [
        ...prev,
        {
          id: `n-${Date.now()}`,
          sensorId: data.sensorId,
          sensorName: sensor.name,
          message: `Trabalho concluído no ${sensor.name}. Altura final: ${data.heightAfter}cm.`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'info'
        }
      ]);
    }

    navigate('/operator/tasks');
  };

  const handleMarkNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const prioritySummary = getPrioritySummary(sensors);

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <Toaster position="top-center" richColors />

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#5b2c83] via-[#3d2f5a] to-[#0f172a]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(146,221,193,0.13),transparent_30%)]" />

            {[...Array(18)].map((_, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.6, 1.2, 0.8],
                  x: [0, Math.sin(index) * 30, 0],
                  y: [0, Math.cos(index) * 26, 0]
                }}
                transition={{
                  duration: 2.8 + index * 0.18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.12
                }}
                className="absolute rounded-full bg-white/20 blur-sm"
                style={{
                  width: `${8 + (index % 4) * 8}px`,
                  height: `${8 + (index % 4) * 8}px`,
                  left: `${8 + index * 5}%`,
                  top: `${15 + (index % 6) * 12}%`
                }}
              />
            ))}

            <div className="relative flex h-full items-center justify-center text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur-md"
                >
                  <Leaf className="h-14 w-14 text-[#d9c7f5]" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                  className="text-4xl font-black tracking-tight sm:text-5xl"
                >
                  Bem-vindo
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-3 text-sm uppercase tracking-[0.35em] text-white/70"
                >
                  Motiva Greencut
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '12rem' }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="mt-6 h-1 rounded-full bg-gradient-to-r from-[#d9c7f5] via-white to-[#d9c7f5] shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                />
              </motion.div>
            </div>
          </motion.div>
        ) : !isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full flex flex-col"
          >
            <div className="h-full w-full flex flex-col overflow-hidden">

      {/* Header */}
      {currentScreen !== 'highway-select' && (
        <header className="bg-[#5b2c83] text-white px-4 py-3 shadow-lg flex items-center justify-between">
          <button
            onClick={() => {
              if (userRole === 'gestor' && currentScreen === 'dashboard') {
                navigate('/highways');
                setSelectedHighway(null);
              }
            }}
            className={`flex items-center gap-3 ${userRole === 'gestor' && currentScreen === 'dashboard' ? 'hover:opacity-80 transition-opacity' : ''}`}
          >
            <Leaf className="w-6 h-6" />
            <div className="text-left">
              <h1 className="font-bold leading-tight">Motiva Greencut</h1>
              <p className="text-xs opacity-90">
                {activeHighway ? activeHighway.name : 'Monitoramento Inteligente'}
              </p>
            </div>
          </button>

          {prioritySummary.urgentCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 border border-white/20">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>{prioritySummary.critical} crítico(s) · {prioritySummary.warning} atenção</span>
            </div>
          )}

        <div className="flex items-center gap-2">
          {userRole === 'gestor' && (
            <>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </>
          )}

          {userRole === 'operador' && (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
        </header>
      )}

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-2xl z-50 min-w-[200px] border border-border">
          <div className="p-3 border-b border-border">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          {currentScreen !== 'highway-select' && (
            <button
              onClick={() => {
                navigate('/highways');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4" />
              Trocar Rodovia
            </button>
          )}
          <button
            onClick={() => {
              navigate(userRole === 'operador' ? '/operator/tasks' : `/highways/${activeHighway?.id ?? highways[0].id}`);
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
          >
            <MapPin className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate(`/highways/${activeHighway?.id ?? highways[0].id}/report`);
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            Relatório
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              handleLogout();
            }}
            className="w-full px-4 py-2 text-left hover:bg-destructive/10 text-destructive flex items-center gap-2 text-sm border-t border-border"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkRead={handleMarkNotificationRead}
          onNotificationClick={(sensorId) => {
            const sensor = getSensorById(sensorId);
            if (sensor) {
              handleSensorClick(sensor);
              setShowNotifications(false);
            }
          }}
        />
      )}

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/highways" element={(
            <RoadwaySelector highways={displayHighways} onSelectHighway={handleSelectHighway} />
          )} />
          <Route path="/highways/:highwayId" element={(
            <Dashboard sensors={routeSensors} onSensorClick={handleSensorClick} />
          )} />
          <Route path="/highways/:highwayId/report" element={(
            <ReportScreen
              sensors={routeSensors}
              occurrences={occurrences}
              interventions={interventions}
              onBack={() => navigate(`/highways/${activeHighway?.id ?? highways[0].id}`)}
              onSensorClick={handleSensorClick}
            />
          )} />
          <Route path="/sensors/:sensorId" element={routeSensor ? (
            <SensorDetails
              sensor={routeSensor}
              onBack={() => navigate(userRole === 'operador' ? '/operator/tasks' : `/highways/${activeHighway?.id ?? highways[0].id}`)}
              onUpdateStatus={handleUpdateSensorStatus}
            />
          ) : <Navigate to={userRole === 'operador' ? '/operator/tasks' : '/highways'} replace />} />
          <Route path="/operator/tasks" element={(
            <OperatorDashboard
              sensors={sensors}
              operatorName={user.name}
              onWorkClick={(sensor) => navigate(`/operator/tasks/${sensor.id}`)}
            />
          )} />
          <Route path="/operator/tasks/:sensorId" element={routeSensor ? (
            <OperatorWorkScreen
              sensor={routeSensor}
              onBack={() => navigate('/operator/tasks')}
              onComplete={handleWorkCompletion}
            />
          ) : <Navigate to="/operator/tasks" replace />} />
          <Route path="/login" element={null} />
          <Route path="*" element={<Navigate to={userRole === 'operador' ? '/operator/tasks' : '/highways'} replace />} />
        </Routes>
      </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
