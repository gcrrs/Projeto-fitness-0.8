import { useState } from 'react'

const SimpleProfileForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    sexo: '',
    idade: '',
    peso: '',
    altura: '',
    objetivo: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">FitCore System</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sexo:</label>
            <select 
              value={formData.sexo} 
              onChange={(e) => setFormData({...formData, sexo: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Idade:</label>
            <input 
              type="number" 
              value={formData.idade}
              onChange={(e) => setFormData({...formData, idade: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Ex: 25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Peso (kg):</label>
            <input 
              type="number" 
              value={formData.peso}
              onChange={(e) => setFormData({...formData, peso: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Ex: 70"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Altura (cm):</label>
            <input 
              type="number" 
              value={formData.altura}
              onChange={(e) => setFormData({...formData, altura: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Ex: 175"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Objetivo:</label>
            <select 
              value={formData.objetivo} 
              onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione</option>
              <option value="emagrecer">Emagrecer</option>
              <option value="ganhar_massa">Ganhar Massa</option>
              <option value="definir">Definir</option>
              <option value="manter">Manter</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Criar Perfil
          </button>
        </form>
      </div>
    </div>
  )
}

export default SimpleProfileForm

