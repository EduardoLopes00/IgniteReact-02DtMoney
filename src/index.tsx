import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs';
import { App } from './App';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions') //The schema references the database that has inside the Mirage.
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody); //Is necessary convert the request to JSON cause it comes as STRING

      return data;
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

