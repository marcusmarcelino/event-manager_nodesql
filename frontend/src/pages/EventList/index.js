import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function EventList({ history }) {
  const [events, setEvents] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [action, setAction] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [event_id, setEvent_id] = useState('');

  async function loadEvents() {
    const response = await api.get('/events');
    setEvents(response.data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleEdit(event) {
    history.push(`/cadastrar`, event);
  }

  async function handleDelete(){
    console.log(event_id);
    try {
      await api.delete(`events/${event_id}`);
      loadEvents();
      setOpenSnackbar(true);
      setAction('success');
    } catch (error) {
      console.log(error);
      setAction('error');
      setOpenSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    setOpenSnackbar(false);
  };

  function handleClickOpenAlert(id) {
    setOpenAlert(true);
    setEvent_id(id);
  };

  const closeAlert = () =>{
    setOpenAlert(false);
  }

  async function handleCloseAndDelet (){
    await handleDelete();
    setOpenAlert(false);
  };

  const formatDate = (date) => {
    const dateAux = date.split("T");
    return dateAux[0];
  }

  return (
    <>
      <header>
        <h1>Listagem de Eventos</h1>
      </header>
      <div className="btn-content">
        <Link to="/cadastrar">
          <button className="btn"><AddIcon /></button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Local</th>
            <th>Data</th>
            <th>Horário</th>
            <th className="td-btn-ops">Ops</th>
          </tr>
        </thead>
        <tbody>
        {events.map(event => (
          <tr key={event.id}>
          <td>{event.name}</td>
          <td>{event.location}</td>
          <td>{formatDate(event.date)}</td>
          <td>{event.time}</td>
          <td className="td-btn-ops">
            <button onClick={() => handleEdit(event)}><EditIcon /></button>
            <button onClick={() => handleClickOpenAlert(event.id)}><DeleteOutlineIcon /></button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
      
      <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={action}>
          {action==="sucess" ? "Erro ao deletar o Evento!":"Evento deletado!" }
        </Alert>
      </Snackbar>

      <Dialog
        open={openAlert}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Excluir Evento?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que quer excluir este Evento definitivamente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert} color="primary">
            Não
          </Button>
          <Button onClick={handleCloseAndDelet} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}