'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

// generate our data client using the Schema from our backend
const client = generateClient<Schema>();

export default function ParienteList() {
  const [parientes, setParientes] = useState<Schema['Pariente'][]>([]);

  const fetchParientes = async () => {
    const { data: items, errors } = await client.models.Pariente.list();
    setParientes(items);
  };
  function createPariente() {
    client.models.Pariente.create({
      firstName: 'Paco',
      lastName: 'Jones'
    }).then((p) => {
      console.log(p);
      fetchParientes().then();
    });
  }

  function checkConnection() {
    console.log('Client is ', client);
    console.log('Models is ', client.models);
  }

  useEffect(() => {
    fetchParientes().then();
  }, []);

  checkConnection();
  return (
    <div>
      <h1>Parientes</h1>
      <ul>
        {parientes.map((pariente) => (
          <li key={pariente.id}>
            {pariente.firstName} {pariente.lastName}
          </li>
        ))}
      </ul>
      <button onClick={createPariente}>Create Pariente</button>
      <button onClick={checkConnection}>Check connection</button>
    </div>
  );
}
