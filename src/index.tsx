import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: { //Defining all the 'tables' that has inside our fake API
    transactions: Model, 
  },

  seeds(server) { //This method will create default data to the referenced 'table' once we start the app. This avoid the necessity of create new transactions to see the list every time we want to test something.
                    
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Life',
          amount: 1100,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 3,
          title: 'Market',
          type: 'withdraw',
          category: 'Food',
          amount: 1300,
          createdAt: new Date('2021-02-12 09:00:00')
        }
      ]
    })
  },
  
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

