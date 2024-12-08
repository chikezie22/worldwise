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
  // Step 2: Convert the flag emoji into an array of code points
  const codePoints = Array.from(flag).map((char) => char.codePointAt(0));

  // Step 3: Calculate country code letters from code points
  const countryCode = codePoints
    .map((codePoint) => String.fromCharCode(codePoint - 127397)) // Regional indicator math
    .join("")
    .toLowerCase();

  // Step 4: Construct the flag image URL
  const imageUrl = `https://flagcdn.com/w40/${countryCode}.png`; // `w40` for a better image size

  // Step 5: Return a valid <img> element
  return <img src={imageUrl} alt={`Flag of ${countryCode}`} />;
};

function City() {
  const { getCity, currentCity, isLoading } = useCities();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji && flagemojiToPNG(emoji)}</span> {cityName}
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
