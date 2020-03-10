import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventForm from './pages/EventForm';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={EventList} />
        <Route path="/cadastrar" component={EventForm} />
      </Switch>
    </BrowserRouter>
  );
}