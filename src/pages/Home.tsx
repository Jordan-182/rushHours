import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "../styles/Home.module.css";

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
    <main className={styles.main}>
      <h1>Welcome to the World of Futurama!</h1>
      <p>
        Meet the wildest crew of the 31st century! From Fry to Bender, and of
        course the brilliant (and slightly mad) Professor Farnsworth — discover
        your favorite characters from the Futurama universe. Click on any card
        to learn more about their story, quotes, and out-of-this-world
        adventures.
      </p>
      {futuramaCharacters ? (
        <ul className={styles.cardsContainer}>
          {futuramaCharacters.map((character) => (
            <li key={`character-${character.id}`} className={styles.card}>
              <img
                src={character.images.main}
                alt={`{character.name.first} {character.name.last}`}
                className={styles.cardImg}
              />
              <h3>
                {character.name.first} {character.name.last}
              </h3>
              <Link
                to={`/character/${character.id}`}
                className={styles.cardBtn}
              >
                See Character
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <section className={styles.loading}>Loading character...</section>
      )}
    </main>
  );
};
