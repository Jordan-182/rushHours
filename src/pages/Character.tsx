import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface FuturamaCharacter {
  id: number;
  name: {
    first: string;
    middle: string;
    last: string;
  };

  images: {
    "head-shot": string;
    main: string;
  };
  age: string;
  gender: string;
  species: string;
  homePlanet: string;
  occupation: string;
  sayings: [children: string];
}

export const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<null | FuturamaCharacter>(null);

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(
          `https://api.sampleapis.com/futurama/characters/${id}`
        );
        const result = await response.json();
        setCharacter(result);
      } catch (error) {
        console.error("Fetching error :", error);
      }
    }
    getCharacters();
  }, [id]);
  return (
    <>
      {character ? (
        <section>
          <img
            src={character.images.main}
            alt={`{character.name.first} {character.name.last}`}
          />
          <h1>
            {character.name.first} {character.name.last}
          </h1>
          <p>Age : {character.age}</p>
          <p>Gender : {character.gender}</p>
          <p>Species: {character.species}</p>
          <p>Home Planet : {character.homePlanet}</p>
          <p>Job : {character.occupation}</p>
          <p>Quotes :</p>
          <ul>
            {character.sayings.map((quote) => (
              <li>{quote}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section>404 : Character not found</section>
      )}
    </>
  );
};
