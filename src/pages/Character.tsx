import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styles from "../styles/Character.module.css";

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
      <main className={styles.main}>
        <div className={styles.backLink}>
          <Link to={`/`}>&larr; Back to Home</Link>
        </div>
        {character ? (
          <section className={styles.container}>
            <article className={styles.characterCard}>
              <img
                src={character.images.main}
                alt={`{character.name.first} {character.name.last}`}
              />
              <h2>
                {character.name.first} {character.name.last}
              </h2>
              <p>
                <strong>Age : </strong>
                {character.age}
              </p>
              <p>
                <strong>Gender : </strong>
                {character.gender}
              </p>
              <p>
                <strong>Species: </strong>
                {character.species}
              </p>
              <p>
                <strong>Home Planet : </strong>
                {character.homePlanet}
              </p>
              <p>
                <strong>Job : </strong>
                {character.occupation}
              </p>
            </article>
            <article className={styles.quotesSection}>
              <h3>{character.name.last}'s Famous Quotes :</h3>
              <ul className={styles.quotesList}>
                {character.sayings.map((quote) => (
                  <li>{quote}</li>
                ))}
              </ul>
            </article>
          </section>
        ) : (
          <section className={styles.loading}>Loading character...</section>
        )}
      </main>
    </>
  );
};
