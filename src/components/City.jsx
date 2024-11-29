import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  // Step 1: Convert the flag emoji into an array of its code points
  const codePoints = Array.from(flag).map((codeUnit) => codeUnit.codePointAt());
  //   console.log(codePoints);

  // Step 2: Convert code points to corresponding country code letters
  const countryCode = codePoints
    .map((codePoint) => {
      // Each regional indicator character's code point minus 127397 gives the ASCII value of the letter
      const letter = String.fromCharCode(codePoint - 127397);
      return letter.toLowerCase(); // Convert the letter to lowercase
    })
    .join(""); // Join the letters into a string

  // Step 3: Create the image URL using the country code
  const imageUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

  // Step 4: Return the image element with the constructed URL
  return <img src={imageUrl} alt="flag" />;
};

function City() {
  const { getCity, currentCity, isLoading } = useCities();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagemojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default City;
