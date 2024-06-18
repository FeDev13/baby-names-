'use client';

import { useState, useEffect } from 'react';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { GiBabyBottle } from 'react-icons/gi';

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
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-row items-center justify-center'>
        <GiBabyBottle className='w-10 h-10 text-2xl' /> 
        <h1 className='text-4xl'>Ranking de nombres para Lenteja </h1>
        <GiBabyBottle className='w-10 h-10 text-2xl' />
      </div>
      
      <div className='flex flex-row items-center mt-20 justify-around w-[55%]'>
        <button className='hover:w-30 hover:h-30 hover:text-4xl'>
          <TbGenderFemale className='w-10 h-10 text-2xl text-pink-500' />
        </button>
        <button>
          <TbGenderMale className='w-10 h-10 text-2xl text-blue-500' />
        </button>
      </div>
      
      <div>
        {names.map((name) => (
          <div className='flex flex-col items-center justify-center bg-slate-500 p-4 rounded-lg m-4 w-[300px]' key={name._id}>
            {name.name} - {name.rating}
            <button onClick={() => handleRate(name._id, 1)}>votar</button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
