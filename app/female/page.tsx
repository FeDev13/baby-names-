'use client';

import { useState, useEffect } from 'react';
import { fetchNames, rateName, Name } from '../../utils/nameUtils';
import { FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { GiTiara } from 'react-icons/gi';

export default function FemaleNames() {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    async function loadNames() {
      const names = await fetchNames();
      // Filter names for female
      const femaleNames = names.filter(name => name.gender === 'female');
      setNames(femaleNames);
    }
    loadNames();
  }, []);

  const handleRate = async (id: string, rating: number) => {
    await rateName(id, rating);
    const updatedNames = await fetchNames();
    const femaleNames = updatedNames.filter(name => name.gender === 'female');
    setNames(femaleNames);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex'>
            <h1 className='text-4xl'>Nombres de princesa</h1>
            <GiTiara className='text-5xl mx-6' />
        </div>
      
      <div>
        {names.map((name) => (
          <div className='flex flex-col items-center justify-center bg-violet-950 p-4 rounded-lg m-4 w-[300px]' key={name._id}>
            <div className='flex items-center justify-center'>
            {name.name} <FaStar className='text-xl text-yellow-400 ml-10 mr-2' /> {name.rating}
            </div>
            
            <button className='mt-6' onClick={() => handleRate(name._id, 1)}><FcLike className='text-3xl' /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
