// components/views/RadarDataView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RadarDataView = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/radar-data/'); // Cambia la URL si es necesario
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <h1>Radar Data</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <strong>{item.date}</strong> - {item.data_type} ({item.resolution})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RadarDataView;
