"use client";

import { useRouter } from "next/navigation";
import { GiBabyBottle } from "react-icons/gi";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

export default function Home() {
  const router = useRouter();

  const goToMaleNames = () => {
    router.push("/male");
  };

  const goToFemaleNames = () => {
    router.push("/female");
  };

  const goToRankings = () => {
    router.push("/ranking");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center mt-10">
        <GiBabyBottle className="w-10 h-10 text-2xl" />
        <h1 className="text-4xl mx-4">Ranking de nombres para Lenteja</h1>
        <GiBabyBottle className="w-10 h-10 text-2xl" />
      </div>
      <p className="mx-2 w-[80%] text-md font-thin my-9 border-2 border-yellow-400 rounded-lg p-4">
        Hace mucho tiempo, en una galaxia muy lejana...
        Hola! Si estas aca es porque tu voto significa mucho para nosotros y
        queremos que de alguna manera nos acompañes en la eleccion del nombre de
        nuestro bebe. Debajo podes hacer click en cada simbolo de nene/nena, que
        te va a llevar a una lista de nombres para que elijas cual te gusta.
        Solamente se vota una vez y un solo nombre, por favor no votar mas de
        una vez. 
        PD: Marco, no hackees esto!!! 
      </p>
      <div className="flex flex-row items-center mt-20 justify-around w-[55%]">
        <button
          className="transform transition duration-300 hover:scale-110 h-20 w-20"
          onClick={goToFemaleNames}
        >
          <TbGenderFemale size={100} className=" text-pink-500 " />
        </button>
        <button onClick={goToMaleNames} className=" transform transition duration-300 hover:scale-110 h-20 w-20">
          <TbGenderMale size={100} className=" text-blue-500" />
        </button>
        <button className='rounded-md p-4 text-black bg-yellow-400'onClick={goToRankings}>Ver ranking</button>
      </div>
    </div>
  );
}
