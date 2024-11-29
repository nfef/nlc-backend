import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import MaterialTable from '@material-table/core';
import { axiosClient } from '../utils/api';

const CandidateList = ({ onEdit, onDelete }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/api/candidates');
                setCandidates(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des candidats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const columns = [
        { 
            title: 'Numéro', 
            field: 'numero', 
            type: 'numeric',
            width: 100
        },
        { 
            title: 'Nom', 
            field: 'nom',
            width: 200
        },
        {
            title: 'Photo',
            field: 'photo',
            render: rowData => (
                <img
                    src={`https://api.newlevelcorporation.org/api/uploads/photo/${rowData.photo}`}
                    alt={rowData.nom}
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/60x60?text=No+Photo';
                    }}
                />
            )
        },
        {
            title: 'Actions',
            field: 'actions',
            sorting: false,
            render: rowData => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onEdit(rowData)}
                        style={{ marginRight: '10px' }}
                    >
                        Modifier
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onDelete(rowData.id)}
                    >
                        Supprimer
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div>
            <Typography variant="h4" component="h1" style={{ marginBottom: '30px', marginTop: '20px' }}>
                Liste des Candidats
            </Typography>
            <Grid container justifyContent="flex-end" style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => onEdit(null)}>
                    Ajouter un candidat
                </Button>
            </Grid>
            <MaterialTable
                columns={columns}
                data={candidates}
                isLoading={loading}
                options={{
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20],
                    search: true,
                    sorting: true,
                    filtering: true,
                    headerStyle: {
                        fontWeight: 'bold'
                    },
                    rowStyle: {
                        fontSize: '14px'
                    },
                    emptyRowsWhenPaging: false,
                    loadingType: 'linear'
                }}
                localization={{
                    pagination: {
                        labelRowsSelect: 'lignes',
                        labelDisplayedRows: '{from}-{to} sur {count}'
                    },
                    toolbar: {
                        searchPlaceholder: 'Rechercher',
                        searchTooltip: 'Rechercher'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    body: {
                        emptyDataSourceMessage: 'Aucun candidat trouvé'
                    }
                }}
            />
        </div>
    );
};

export default CandidateList;