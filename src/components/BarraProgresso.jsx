import React from 'react';

const BarraProgresso = ({ valor, meta, label, unidade, cor }) => {
  const percentual = meta > 0 ? (valor / meta) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-500">{valor.toFixed(0)} / {meta} {unidade}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${cor}`} 
          style={{ width: `${Math.min(percentual, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BarraProgresso;