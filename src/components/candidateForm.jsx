import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/images/logo-nlc.jpeg';
import { axiosClient } from '../utils/api';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fileInput: {
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    position: 'relative'
  }
}));

const CandidateForm = ({ onCancel }) => {
  const classes = useStyles();
 
  const [formData, setFormData] = useState({
    nom: '',
    pays: '',
    numero: ''
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append('nom', formData.nom);
    submitData.append('pays', formData.pays);
    submitData.append('numero', formData.numero);
    if (photo) {
      submitData.append('photo', photo);
    }

    try {
      await axiosClient.post('/api/candidates', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setNotification({
        open: true,
        message: 'Candidat ajouté avec succès !',
        severity: 'success'
      });

      // Reset form and redirect after successful submission
      setTimeout(() => {
        setFormData({ nom: '', pays: '', numero: '' });
        setPhoto(null);
        onCancel();
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: `Une erreur est survenue: ${error.response?.data?.message || error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <img src={logo} alt="Candidate" height={100} width={100} />
      <br />
      <Typography component="h1" variant="h5">
        Ajouter un candidat
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="nom"
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="pays"
              label="Pays"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="numero"
              label="Numéro"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              className={classes.fileInput}
              id="photo-upload"
              type="file"
              onChange={handleFileChange}
              disabled={loading}
            />
          </Grid>
        </Grid>
        <div className={classes.wrapper}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Valider'}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
      </form>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CandidateForm;