'use client';

import { useState, useEffect } from 'react';
import { fetchNames, rateName, Name } from '../../utils/nameUtils';
import { GiLightSabers } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import "../../styles/global.css"
import { useGoHome } from '../../hooks/useGoHome';


export default function MaleNames() {
  
  
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const goHome = useGoHome();

  useEffect(() => {
    async function loadNames() {
      try {
        const fetchedNames = await fetchNames();
        const femaleNames = fetchedNames.filter(name => name.gender === 'male');
        setNames(femaleNames);
      } catch (error) {
        console.error('Error en la base de datos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadNames();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#f9f600" size={50} />
      </div>
    );
  }

  const handleRate = async (id: string, rating: number) => {
    try {
      await rateName(id, rating);
      const updatedNames = await fetchNames();
      setNames(updatedNames.filter(name => name.gender === 'male'));
      toast.success('Gracias por tu voto!');
    } catch (error) {
      toast.error('Failed to submit your vote.');
    }
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
            
            <button className='mt-6 bg-transparent' onClick={() => handleRate(name._id, 1)}><FcLike className='text-3xl' /></button>
          </div>
        ))}
      </div>
      <button className='rounded-md p-4 text-black'onClick={goHome}>Regresar</button>
    </div>
  );
}
