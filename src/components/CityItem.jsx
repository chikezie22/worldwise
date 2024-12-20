/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";
// import { string } from "prop-types";

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

// export const flagemoji = (flag) => {
//   if (typeof flag !== string) return;
//   const countryFlag = flag.toLowerCase();
//   return (
//     <img src={`https://flagcdn.com/24x18/${countryFlag}.png`} alt="flag" />
//   );
// };

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "short",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteCity(id);
          }}
          className={styles.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
