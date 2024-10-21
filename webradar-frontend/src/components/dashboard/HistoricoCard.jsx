// import { useState } from 'react';
// import { Select, Form, Button, ConfigProvider, Row, Col, Card } from 'antd';
// import esES from 'antd/es/locale/es_ES';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// const { Option } = Select;

// const ImageCard = () => {
//   const [year, setYear] = useState('2024');
//   const [month, setMonth] = useState('03');
//   const [day, setDay] = useState('01');
//   const [filtroTipo, setFiltroTipo] = useState(null);
//   const [altura, setAltura] = useState(null);
//   const [graphData, setGraphData] = useState(null);
//   const [layout, setLayout] = useState(null);

//   // Manejo del filtro y la solicitud al backend
//   const handleFilter = () => {
//     if (year && month && day && filtroTipo && altura) {
//       const formattedDate = `${year}${month}${day}`; // Formato de fecha correcto
//       const resolution = `${altura}m`; // Formato de resolución correcto

//       axios
//         .get('http://127.0.0.1:8000/api/filter-json/', {
//           params: {
//             date: formattedDate,
//             variable: filtroTipo,
//             resolution: resolution,
//           },
//         })
//         .then((response) => {
//           const { data } = response;
//           console.log('Datos recibidos del backend:', data);  // Verifica la estructura del JSON en consola
          
//           if (data.length > 0 && data[0].data) {
//             // Verifica que la estructura sea la correcta
//             const jsonData = data[0].data;
//             if (jsonData.time && jsonData.height && jsonData.dbz) {
//               setGraphData(jsonData);
//               setLayout({ title: `${filtroTipo} - ${altura}m - ${formattedDate}` });
//             } else {
//               alert('La estructura de los datos es incorrecta.');
//               console.error('Estructura de datos inesperada:', jsonData);
//               setGraphData(null);
//             }
//           } else {
//             setGraphData(null);
//             setLayout(null);
//             alert('No se encontraron datos para los filtros seleccionados.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error al cargar los datos:', error);
//           alert('Error en la solicitud de datos. Verifique la consola para más detalles.');
//         });
//     } else {
//       alert('Por favor, selecciona todos los filtros.');
//     }
//   };

//   // Renderiza el gráfico utilizando Plotly.js
//   const renderGraph = () => {
//     if (!graphData || !layout) {
//       return <div style={{ textAlign: 'center' }}>Cargando gráfico...</div>;
//     }

//     // Verificación de la estructura del JSON
//     console.log('Datos para el gráfico:', graphData);  // Verifica si los datos están correctamente estructurados
//     if (!graphData.time || !graphData.height || !graphData.dbz) {
//       return <div>Error: Falta información en los datos recibidos.</div>;
//     }

//     // Mapear las fechas y formatear solo la hora para el eje X
//     const fechas = graphData.time.map((fecha) => {
//       const timePart = fecha.split(' ')[1]; // Separa la hora de la fecha completa
//       return timePart ? timePart.slice(0, 5) : fecha.slice(11, 16); // Mostrar solo hora:minuto
//     });

//     // Aplanar los arrays bidimensionales si es necesario
//     const altura = Array.isArray(graphData.height[0]) ? graphData.height.flat() : graphData.height;
//     const reflectividad = Array.isArray(graphData.dbz[0]) ? graphData.dbz.flat() : graphData.dbz;

//     // Validación de que las estructuras son arrays correctos
//     if (!Array.isArray(fechas) || !Array.isArray(altura) || !Array.isArray(reflectividad)) {
//       return <div>Error en la estructura de los datos.</div>;
//     }

//     // Datos para Plotly
//     const plotData = [
//       {
//         x: fechas,
//         y: altura,
//         z: reflectividad,
//         type: 'heatmap',
//         colorscale: 'Jet',
//         zmin: 0,
//         zmax: 40,
//         colorbar: { title: 'dBZ' },
//       },
//     ];

//     // Layout del gráfico
//     const plotLayout = {
//       title: layout.title || 'Reflectividad MRR - Rango dBZ de 0 a 40',
//       xaxis: { title: 'Hora', tickmode: 'array', tickvals: fechas, ticktext: fechas },
//       yaxis: { title: 'Altura (m)' },
//       autosize: true,
//     };

//     return <Plot data={plotData} layout={plotLayout} style={{ width: '100%', height: '100%' }} />;
//   };

//   // Opciones para año, mes y día
//   const years = ['2022', '2023', '2024', '2025'];
//   const months = [
//     { value: '01', label: 'Enero' },
//     { value: '02', label: 'Febrero' },
//     { value: '03', label: 'Marzo' },
//     { value: '04', label: 'Abril' },
//     { value: '05', label: 'Mayo' },
//     { value: '06', label: 'Junio' },
//     { value: '07', label: 'Julio' },
//     { value: '08', label: 'Agosto' },
//     { value: '09', label: 'Septiembre' },
//     { value: '10', label: 'Octubre' },
//     { value: '11', label: 'Noviembre' },
//     { value: '12', label: 'Diciembre' },
//   ];
//   const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

//   return (
//     <ConfigProvider locale={esES}>
//       <div style={{ margin: '10px' }}>
//         <Card
//           title="Histórico MRR"
//           bordered={true}
//           style={{ width: '90%', height: 'calc(100vh - 40px)', padding: '20px' }} // Ajustar padding y altura
//         >
//           <Row justify="center">
//             <Col span={24}>{renderGraph()}</Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               <Form layout="vertical" onFinish={handleFilter}>
//                 <Form.Item label="Año">
//                   <Select value={year} onChange={setYear} placeholder="Seleccionar año">
//                     {years.map((yr) => (
//                       <Option key={yr} value={yr}>
//                         {yr}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Mes">
//                   <Select value={month} onChange={setMonth} placeholder="Seleccionar mes">
//                     {months.map((mnth) => (
//                       <Option key={mnth.value} value={mnth.value}>
//                         {mnth.label}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Día">
//                   <Select value={day} onChange={setDay} placeholder="Seleccionar día">
//                     {days.map((d) => (
//                       <Option key={d} value={d}>
//                         {d}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Variable">
//                   <Select value={filtroTipo} onChange={setFiltroTipo} placeholder="Seleccionar variable">
//                     <Option value="dbz">DBZ</Option>
//                     <Option value="fall_velocity">Velocidad Vertical</Option>
//                     <Option value="spectral_drop_density">Ancho del Espectro</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Altura (m)">
//                   <Select value={altura} onChange={setAltura} placeholder="Seleccionar altura">
//                     <Option value="100">100</Option>
//                     <Option value="250">250</Option>
//                   </Select>
//                 </Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Filtrar
//                 </Button>
//               </Form>
//             </Col>
//           </Row>
//         </Card>
//       </div>
//     </ConfigProvider>
//   );
// };

// export default ImageCard;

import { useState } from 'react';
import { Select, Form, Button, ConfigProvider, Row, Col, Card } from 'antd';
import esES from 'antd/es/locale/es_ES';
import axios from 'axios';
import Plot from 'react-plotly.js';

const { Option } = Select;

const ImageCard = () => {
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('03');
  const [day, setDay] = useState('01');
  const [filtroTipo, setFiltroTipo] = useState(null);
  const [altura, setAltura] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [layout, setLayout] = useState(null);

  const fetchGraphData = () => {
    if (year && month && day && filtroTipo && altura) {
      const formattedDate = `${year}${month}${day}`; // Formato de fecha correcto
      const resolution = `${altura}m`; // Formato de resolución correcto

      axios
        .get('http://127.0.0.1:8000/api/filter-json/', {
          params: {
            date: formattedDate,
            variable: filtroTipo,
            resolution: resolution,
          },
        })
        .then((response) => {
          const { data } = response;
          if (data.length > 0 && data[0].data) {
            const jsonData = data[0].data;

            // Verificar estructura de datos
            if (jsonData.time && jsonData.height && jsonData.dbz) {
              // Configuración de trazas
              const trace = {
                x: jsonData.time.map((fecha) => fecha.split(' ')[1]?.slice(0, 5) || fecha.slice(11, 16)),
                y: jsonData.height.flat(),  // Aplanar altura si es bidimensional
                z: jsonData.dbz.flat(),     // Aplanar reflectividad si es bidimensional
                type: 'heatmap',
                colorscale: [
                  [0.0, 'rgb(0, 0, 255)'],   // Azul (precipitación baja, 0 dBZ)
                  [0.2, 'rgb(0, 255, 0)'],   // Verde (precipitación ligera, 10 dBZ)
                  [0.4, 'rgb(255, 255, 0)'], // Amarillo (precipitación moderada, 20 dBZ)
                  [0.6, 'rgb(255, 165, 0)'], // Naranja (precipitación fuerte, 30 dBZ)
                  [0.8, 'rgb(255, 0, 0)'],   // Rojo (precipitación intensa, 40 dBZ)
                  [1.0, 'rgb(128, 0, 128)']  // Morado (granizo o evento extremo, 50+ dBZ)
                ],
                zmin: 0,
                zmax: 50,
                colorbar: { title: 'dBZ' },
              };

              setGraphData([trace]);
              setLayout({ title: `${filtroTipo} - ${altura}m - ${formattedDate}` });
            } else {
              alert('La estructura de los datos es incorrecta.');
              setGraphData(null);
            }
          } else {
            alert('No se encontraron datos para los filtros seleccionados.');
            setGraphData(null);
            setLayout(null);
          }
        })
        .catch((error) => {
          console.error('Error al cargar los datos:', error);
          alert('Error en la solicitud de datos.');
        });
    } else {
      alert('Por favor, selecciona todos los filtros.');
    }
  };

  const renderGraph = () => {
    if (!graphData || !layout) {
      return <div style={{ textAlign: 'center' }}>Cargando gráfico...</div>;
    }

    return <Plot data={graphData} layout={layout} style={{ width: '100%', height: '100%' }} />;
  };

  const years = ['2022', '2023', '2024', '2025'];
  const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <ConfigProvider locale={esES}>
      <div style={{ margin: '10px' }}>
        <Card
          title="Histórico MRR"
          bordered={true}
          style={{ width: '90%', height: 'calc(100vh - 40px)', padding: '20px' }}
        >
          <Row justify="center">
            <Col span={24}>{renderGraph()}</Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form layout="vertical" onFinish={fetchGraphData}>
                <Form.Item label="Año">
                  <Select value={year} onChange={setYear} placeholder="Seleccionar año">
                    {years.map((yr) => (
                      <Option key={yr} value={yr}>
                        {yr}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Mes">
                  <Select value={month} onChange={setMonth} placeholder="Seleccionar mes">
                    {months.map((mnth) => (
                      <Option key={mnth.value} value={mnth.value}>
                        {mnth.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Día">
                  <Select value={day} onChange={setDay} placeholder="Seleccionar día">
                    {days.map((d) => (
                      <Option key={d} value={d}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Variable">
                  <Select value={filtroTipo} onChange={setFiltroTipo} placeholder="Seleccionar variable">
                    <Option value="dbz">DBZ</Option>
                    <Option value="fall_velocity">Velocidad Vertical</Option>
                    <Option value="spectral_drop_density">Ancho del Espectro</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Altura (m)">
                  <Select value={altura} onChange={setAltura} placeholder="Seleccionar altura">
                    <Option value="100">100</Option>
                    <Option value="250">250</Option>
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Filtrar
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default ImageCard;
