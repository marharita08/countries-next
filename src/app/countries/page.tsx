"use client"

import countriesService from "../services/countries.service";
import { CountryCard } from "../components/country/country-card";
import { Country } from "../types/types";
import { useFetchData } from "../hooks/use-fetch-data";
import { Loader } from "../components/loader/loader";
import { ErrorDisplay } from "../components/error-display/error-display";

import styles from "./page.module.css";

export default function Countries () {
  const {
    data: countries,
    isLoading,
    errorMessage
  } = useFetchData<Country[]>(countriesService.getAvailableCountries, []);

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>Countries</h1>
      {isLoading ? (
        <Loader />
      ) : countries.length > 0 ? (
        <div className={`${styles.countries}`}>
          {countries.map(country => (
            <CountryCard country={country} key={country.countryCode} />
          ))}
        </div>
      ) : (
        <ErrorDisplay message={errorMessage} />
      )}
    </div>
  );
};
