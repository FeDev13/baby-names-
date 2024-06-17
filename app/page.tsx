'use client';

import { useState, useEffect } from 'react';

interface Name {
  _id: string;
  name: string;
  rating: number;
}

async function fetchNames(): Promise<Name[]> {
  const res = await fetch('/api/names');
  if (!res.ok) {
    throw new Error('Failed to fetch names');
  }
  return res.json();
}

async function rateName(id: string, rating: number): Promise<void> {
  await fetch('/api/names', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, rating }),
  });
}

export default function Home() {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    async function loadNames() {
      const names = await fetchNames();
      setNames(names);
    }
    loadNames();
  }, []);

  const handleRate = async (id: string, rating: number) => {
    await rateName(id, rating);
    const updatedNames = await fetchNames();
    setNames(updatedNames);
  };

  return (
    <div>
      <h1>Ranking de nombres para Lenteja </h1>
      <ul>
        {names.map((name) => (
          <li key={name._id}>
            {name.name} - {name.rating}
            <button onClick={() => handleRate(name._id, 1)}>votar</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
