"use client"

import { useEffect, useState } from "react";

import countriesService from "../services/countries.service";
import { CountryCard } from "../components/country/country-card";
import { Country } from "../types/types";
import styles from "./page.module.css";

export default function Countries () {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setCountries(await countriesService.getAvailableCountries());
    };

    fetchData();
  }, []);

  return (
    <>
      {countries.length > 0 && (
        <div className={styles.countries}>
          {countries.map(country => (
            <CountryCard country={country} key={country.countryCode} />
          ))}
        </div>
      )}
    </>
  );
};
