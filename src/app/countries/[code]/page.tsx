"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import countriesService from "../../services/countries.service";
import { CountryCard } from "../../components/country/country-card";
import { PopulationChart } from "../../components/population-chart/population-chart";
import { CountryFullInfo } from "../../types/types";
import styles from "./page.module.css";

export default function CountryInfo() {
  const { code } = useParams();
  const [country, setCountry] = useState<CountryFullInfo>();

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        setCountry(await countriesService.getCountryInfo(code as string));
      }
    };

    fetchData();
  }, [code]);

  return (
    <>
      {country && (
        <div>
          <div className={styles.header}>
            <Image
              src={country.flagUrl}
              alt={code as string}
              width={100}
              height={50}
            />
            <div className={styles.country_name}>{country.officialName}</div>
          </div>
          <div className={styles.borders_container}>
            <div className={styles.borders_title}>Borders</div>
            <div className={styles.borders}>
              {country.borders && country.borders.map(border => (
                <CountryCard
                  country={{
                    name: border.officialName,
                    countryCode: border.countryCode
                  }}
                  key={border.countryCode}
                />
              ))}
            </div>
          </div>
          <div className={styles.population_container}>
            <div className={styles.population_title}>Population</div>
            <PopulationChart
              populationCounts={country.population}
            />
          </div>
        </div>
      )}
    </>
  );
}