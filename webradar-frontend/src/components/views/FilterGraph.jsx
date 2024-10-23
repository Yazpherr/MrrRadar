import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const FilterGraph = () => {
  // Estados para los filtros y los datos
  const [fecha, setFecha] = useState('');
  const [variable, setVariable] = useState('dbz');
  const [resolucion, setResolucion] = useState('100m');
  const [data, setData] = useState(null);

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Hacer la solicitud al backend con los filtros seleccionados
      const url = `/api/obtener-json/${fecha}/${variable}/${resolucion}/`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener el JSON:', error);
    }
  };

  // Renderizado del formulario y el gráfico (cuando hay datos)
  return (
    <div>
      <h1>Filtrar y Graficar Datos</h1>
      
      {/* Formulario para los filtros */}
      <form onSubmit={handleSubmit}>
        <label>Fecha (YYYYMMDD):
          <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="20240801" />
        </label>
        <br />
        <label>Variable:
          <select value={variable} onChange={(e) => setVariable(e.target.value)}>
            <option value="dbz">Reflectividad (dBZ)</option>
            <option value="fall_velocity">Velocidad de Caída (fall_velocity)</option>
          </select>
        </label>
        <br />
        <label>Resolución:
          <select value={resolucion} onChange={(e) => setResolucion(e.target.value)}>
            <option value="100m">100m</option>
            <option value="250m">250m</option>
          </select>
        </label>
        <br />
        <button type="submit">Cargar Datos</button>
      </form>

      {/* Mostrar el gráfico si hay datos */}
      {data && <PlotGraph data={data} variable={variable} />}
    </div>
  );
};

// Componente para graficar los datos usando Plotly
const PlotGraph = ({ data, variable }) => {
  if (!data) return <p>No hay datos disponibles</p>;

  const fechas = data.time || [];
  const altura = data.height || [];
  const zValues = variable === 'dbz' ? data.reflectivity : data.fall_velocity;

  // Validar si zValues existe, de lo contrario mostrar mensaje
  if (!zValues) {
    return <p>No se encontraron datos para la variable seleccionada.</p>;
  }

  return (
    <Plot
      data={[
        {
          x: fechas,
          y: altura,
          z: zValues,
          type: 'heatmap',
          colorscale: 'Jet',
          zmin: variable === 'dbz' ? 0 : -3,
          zmax: variable === 'dbz' ? 40 : 9,
          colorbar: { title: variable === 'dbz' ? 'dBZ' : 'Velocidad de Caída (m/s)' }
        }
      ]}
      layout={{
        title: variable === 'dbz' ? 'Reflectividad MRR - Rango dBZ de 0 a 40' : 'Velocidad de Caída - Resolución en Altura',
        xaxis: { title: 'Hora' },
        yaxis: { title: 'Altura (m)' }
      }}
    />
  );
};

// Añadir validación de tipos de props
PlotGraph.propTypes = {
  data: PropTypes.shape({
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    height: PropTypes.arrayOf(PropTypes.number).isRequired,
    reflectivity: PropTypes.array,
    fall_velocity: PropTypes.array
  }).isRequired,
  variable: PropTypes.oneOf(['dbz', 'fall_velocity']).isRequired
};

export default FilterGraph;
