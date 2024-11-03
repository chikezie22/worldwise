import styles from "./CountryItem.module.css";

const flagemojiToPNG = (flag) => {
  // Step 1: Convert the flag emoji into an array of its code points
  const codePoints = Array.from(flag).map((codeUnit) => codeUnit.codePointAt());
  console.log(codePoints);

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

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{flagemojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
