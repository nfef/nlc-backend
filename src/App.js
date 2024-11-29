import React, { useState } from 'react';
import Header from './components/Header';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import { axiosClient } from './utils/api';
import './App.css';

function App() {
  const [isFormMode, setIsFormMode] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const handleEdit = (candidate) => {
    console.log('handleEdit appelé avec:', candidate);
    setEditingCandidate(candidate);
    setIsFormMode(true);
  };

  const handleDelete = (id) => {
    axiosClient.delete(`/api/candidates/${id}`).then(() => {
      console.log('Candidat supprimé:', id);
      // Mettre à jour la liste des candidats après suppression
    });
  };

  const handleSave = () => {
    console.log('Sauvegarde effectuée');
    setEditingCandidate(null);
    setIsFormMode(false);
  };

  const handleCancel = () => {
    console.log('Annulation effectuée');
    setEditingCandidate(null);
    setIsFormMode(false);
  };

  return (
    <div>
      <Header />
      <div className="App-body">
        {isFormMode ? (
          <CandidateForm 
            candidate={editingCandidate} 
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <CandidateList onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
