'use client'
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { fetchNames } from "@/utils/nameUtils";
import { useGoHome } from "../../hooks/useGoHome";
import { ClipLoader } from "react-spinners";

interface Name {
  _id: string;
  name: string;
  rating: number;
  gender: string;
}

export default function RankingPage() {
  
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const goHome = useGoHome();
  
  useEffect(() => {
    async function loadNames() {
      try {
        const fetchedNames = await fetchNames();
        const sortedNames = fetchedNames.sort((a, b) => b.rating - a.rating);
      setNames(sortedNames);
      } catch (error) {
        console.error('Error al traer nombres:', error);
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4 mt-2 text-center">Ranking de Nombres</h1>
      <button className='rounded-md p-4 text-black 'onClick={goHome}>Regresar</button>
      <div className="grid grid-cols-1">
        {names.map((name) => (
          <div
            className="flex flex-col items-center justify-center bg-black p-4 rounded-lg m-4 w-[200px] transform transition duration-300 hover:scale-105"
            key={name._id}
            id="card"
          >
            <div className="flex items-center justify-center">
              {name.name}{" "}
              <FaStar className="text-xl text-yellow-400 ml-10 mr-2" />{" "}
              {name.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
