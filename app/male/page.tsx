'use client';

import { useState, useEffect } from 'react';
import { fetchNames, rateName, Name } from '../../utils/nameUtils';
import { GiLightSabers } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import "../../styles/global.css"
import { useRouter } from 'next/navigation';


export default function MaleNames() {
  const router = useRouter();
  const goHome = () => router.push('/');
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    async function loadNames() {
      const names = await fetchNames();
      
      const maleNames = names.filter(name => name.gender === 'male');
      setNames(maleNames);
    }
    loadNames();
  }, []);

  const handleRate = async (id: string, rating: number) => {
    await rateName(id, rating);
    const updatedNames = await fetchNames();
    const maleNames = updatedNames.filter(name => name.gender === 'male');
    setNames(maleNames);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex'>
            <h1 className='text-4xl mt-2 text-center'>Nombres de jedi</h1>
            <GiLightSabers className='text-4xl mx-4 mt-2' />
        </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
      {names.map((name) => (
          <div className='flex flex-col items-center justify-center bg-black border-2 border-yellow-400 p-4 rounded-lg m-4 w-[200px] transform transition duration-300 hover:scale-105' key={name._id}>
            <div className='flex items-center justify-center'>
            {name.name} <FaStar className='text-xl text-yellow-400 ml-10 mr-2' /> {name.rating}
            </div>
            
            <button className='mt-6' onClick={() => handleRate(name._id, 1)}><FcLike className='text-3xl' /></button>
          </div>
        ))}
      </div>
      <button className='rounded-md p-4 text-black bg-yellow-400'onClick={goHome}>Regresar</button>
    </div>
  );
}
