import { createContext, useState, useEffect } from 'react';
import { housesData } from '../data/Data';

export const HouseContext = createContext(null);

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Select Country');
  const [countries, setCountries] = useState([]);
  const [price, setPrice] = useState('Select Price');
  const [property, setProperty] = useState('Select type');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const allCountries = housesData.map((house) => house.country);
    const uniqueCountries = [...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    const allPropertyTypes = housesData.map((house) => house.type);
    const uniquePropertyTypes = [...new Set(allPropertyTypes)];
    setProperties(uniquePropertyTypes);
  }, []);

  const isDefault = (str) => {
    return str === 'Select';
  };

  const searchHandler = () => {
    // Parse the selected price range
    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' - ')[1]);

    // Filter the housesData based on selected criteria
    const filteredHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // Check if each filtering criteria matches or is not set to 'Select'
      if (
        (isDefault(country) || house.country === country) &&
        (isDefault(price) || (housePrice >= minPrice && housePrice <= maxPrice)) &&
        (isDefault(property) || house.type === property)
      ) {
        return true; // Include this house in the filtered result
      }

      return false; // Exclude this house from the filtered result
    });

    // Update the state with the filtered houses
    setHouses(filteredHouses);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        countries,
        price,
        setPrice,
        property,
        setProperty,
        properties,
        searchHandler,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseProvider;
