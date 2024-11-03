import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  const countriesVisited = cities.reduce((arr, city) => {
    // console.log(arr, city);
    if (!arr.map((country) => country.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);
  console.log(countriesVisited);
  return (
    <ul className={styles.countryList}>
      {countriesVisited?.map((country, id) => (
        <CountryItem country={country} key={id} />
      ))}
    </ul>
  );
}

export default CountryList;
