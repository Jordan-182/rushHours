import { useEffect, useState } from "react";
import { Link } from "react-router";

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

export const Home = () => {
  const [futuramaCharacters, setFuturamaCharacters] = useState<
    FuturamaCharacter[]
  >([]);

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(
          "https://api.sampleapis.com/futurama/characters"
        );
        const result = await response.json();
        setFuturamaCharacters(result);
      } catch (error) {
        console.error("Fetching error :", error);
      }
    }
    getCharacters();
  }, []);

  return (
    <>
      <h1>Futurama Characters</h1>
      <ul>
        {futuramaCharacters.map((character) => (
          <li key={`character-${character.id}`}>
            <img
              src={character.images.main}
              alt={`{character.name.first} {character.name.last}`}
            />
            <h3>
              {character.name.first} {character.name.last}
            </h3>
            <Link to={`/character/${character.id}`}>
              <button> See character</button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
