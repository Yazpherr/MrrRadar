import { useState, useEffect } from 'react';
import { Layout, Spin } from "antd"; // Importar Spin
import LargeSidebar from "../asidebar/LargeSidebar";
import HamburgerSidebar from "../asidebar/HamburgerSidebar";
import ResumenDiarioCard from './ResumenDiarioCard'; // Componente para Resumen Diario
import HistoricoCard from './HistoricoCard'; // Componente para Histórico

const { Content } = Layout;

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('resumen'); // Estado para controlar la selección
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  // Simular la carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Detener la carga después de 2 segundos
    }, 2000);
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  // Función para renderizar el contenido basado en la selección
  const renderContent = () => {
    switch (selectedMenu) {
      case 'resumen':
        return <ResumenDiarioCard />;
      case 'historico':
        return <HistoricoCard />;
      default:
        return <ResumenDiarioCard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Large sidebar para pantallas grandes */}
      <LargeSidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      {/* Hamburger sidebar para pantallas pequeñas y medianas */}
      <HamburgerSidebar setSelectedMenu={setSelectedMenu} />

      {/* Main content */}
      <Layout>
        <Content
          style={{ margin: "10px", padding: "0", backgroundColor: "#f0f2f5" }}
        >
          <div className="w-full flex justify-center items-center" style={{ height: '100vh' }}>
            {loading ? ( // Mostrar el Spinner mientras se carga
              <Spin size="large" />
            ) : (
              renderContent() // Renderiza la carta correspondiente
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
