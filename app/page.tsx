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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center mt-10">
        <GiBabyBottle className="w-10 h-10 text-2xl" />
        <h1 className="text-4xl">Ranking de nombres para Lenteja</h1>
        <GiBabyBottle className="w-10 h-10 text-2xl" />
      </div>
      <p className="mx-2 w-[80%] text-lg my-9">
        Hola! Si estas aca es porque tu voto significa mucho para nosotros y
        queremos que de alguna manera nos acompañes en la eleccion del nombre de
        nuestro bebe. Debajo podes hacer click en cada simbolo de nene/nena, que
        te va a llevar a una lista de nombres para que elijas cual te gusta.
        Solamente se vota una vez y un solo nombre, por favor no votar mas de
        una vez. PD: <strong>Marco, no hackees esto!!!</strong> 
      </p>
      <div className="flex flex-row items-center mt-20 justify-around w-[55%]">
        <button
          className="hover:w-30 hover:h-30 hover:text-4xl"
          onClick={goToFemaleNames}
        >
          <TbGenderFemale className="w-10 h-10 text-2xl text-pink-500" />
        </button>
        <button onClick={goToMaleNames}>
          <TbGenderMale className="w-10 h-10 text-2xl text-blue-500" />
        </button>
      </div>
    </div>
  );
}
