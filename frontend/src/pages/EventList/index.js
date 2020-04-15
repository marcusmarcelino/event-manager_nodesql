import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

export default function EventList({ history }) {
  const [events, setEvents] = useState([]);

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
            <button onClick={() =>{}}><DeleteOutlineIcon /></button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}