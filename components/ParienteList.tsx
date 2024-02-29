"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

// generate our data client using the Schema from our backend
const client = generateClient<Schema>();

export default function ParienteList() {
  const [parientes, setParientes] = useState<Schema["Pariente"][]>([]);

  async function listParientes() {
    // fetch all todos
    const { data } = await client.models.Pariente.list();
    setParientes(data);
  }

  useEffect(() => {
    listParientes().then(); // Don't need to do anything with the promise result
  }, []);

  return (
      <div>
        <h1>Parientes</h1>
        <ul>
          {parientes.map((pariente) => (
              <li key={pariente.id}>{pariente.firstName} {pariente.lastName}</li>
          ))}
        </ul>
      </div>
  );
}