import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/images/logo-nlc.jpeg';
import swal from 'sweetalert';
// import 'sweetalert/dist/sweetalert.css';


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
  }
}));

const CandidateForm = () => {
  const classes = useStyles();
 
  const [nom, setNom] = useState('');
  const [pays, setPays] = useState('');
  const [numero, setNumero] = useState('');
  const [photo, setPhoto] = useState(null);

  const axiosClient = axios.create({
    baseURL: 'http://newlevelcorporation.org/api/',
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('pays', pays);
    formData.append('numero', numero);
    formData.append('photo', photo);

    try {
      await axiosClient.post('/candidates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      swal({
        title: 'Information',
        text: 'Candidat ajouté avec succès. !',
        icon: 'success',
        
      })
      .then((action) => {
        setNom('');
        setPays('');
        setNumero('');
        setPhoto(null);
      });
      
    } catch (error) {
      console.error(error);
      swal({
        title: 'Information',
        text: `une erreur est survenue ${error}`,
        icon: 'error',
      })
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
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
              value={nom}
              onChange={(e) => setNom(e.target.value)}
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
              value={pays}
              onChange={(e) => setPays(e.target.value)}
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
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" name="photo" onChange={handleFileChange} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Valider
        </Button>
      </form>
    </Container>
  );
};

export default CandidateForm;
