import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoMacros = ({ proteinas, carboidratos, gorduras }) => {
  // Converte gramas para calorias (Proteína/Carbo = 4 kcal/g, Gordura = 9 kcal/g)
  const caloriasProteina = proteinas * 4;
  const caloriasCarboidratos = carboidratos * 4;
  const caloriasGorduras = gorduras * 9;

  const data = {
    labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
    datasets: [
      {
        label: 'Calorias por Macro',
        data: [caloriasProteina, caloriasCarboidratos, caloriasGorduras],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)', // Azul para Proteínas
          'rgba(255, 206, 86, 0.8)', // Amarelo para Carboidratos
          'rgba(255, 99, 132, 0.8)',  // Vermelho para Gorduras
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed.toFixed(0) + ' kcal';
            }
            return label;
          }
        }
      }
    },
    cutout: '60%', // Transforma o gráfico de pizza em um "donut"
  };

  return (
    <div className="relative h-64 w-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraficoMacros;