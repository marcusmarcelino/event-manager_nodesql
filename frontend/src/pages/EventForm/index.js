import React,{ useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function EventForm({ history }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if(history.location.state){
      const { id, name, location, date, time} = history.location.state;
      const dateAux = date.split("T");
      setId(id);
      setName(name);
      setLocation(location);
      setDate(dateAux[0]);
      setTime(time);
    }
  }, []);

  async function handleSubmit (event){
    event.preventDefault();

    if(!id){
      await api.post('/events', {
        name,
        location,
        date,
        time
      });
    }else{
      await api.put(`/events/${id}`, {
        name,
        location,
        date,
        time
      });
    }
    setOpen(true);
    setTimeout(function() {
      home();
    }, 1500)
  }

  const home = () => history.push('/');

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <>
      <header className="header-form">
        <h1>Formulário de Eventos</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do Evento *</label>
        <input 
          id="name"
          type="text"
          required
          placeholder="Nome do seu Evento"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <label htmlFor="location">Local do Evento *</label>
        <input 
          id="location"
          type="text"
          required
          placeholder="Qual é o local?"
          value={location}
          onChange={event => setLocation(event.target.value)}
        />

        <label htmlFor="date">Quando será? * <span>(ex: dia 1 de Janeiro)</span></label>
        <input 
          id="date"
          type="date"
          required
          placeholder="Data do seu evento"
          value={date}
          onChange={event => setDate(event.target.value)}
        />

        <label htmlFor="time">Horário do Evento *</label>
        <input 
          id="time"
          type="time"
          required
          placeholder="Que horas ocorrerá?"
          value={time}
          onChange={event => setTime(event.target.value)}
        />
      <div className="content-btn">
        <button type="submit" className="btn btn-submit">{history.location.state ? 'Salvar' : 'Cadastrar'}</button>
        <button type="button" onClick={home} className="btn btn-submit">Cancelar</button>
      </div>
      </form>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          Salvo com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}