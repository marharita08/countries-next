"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import countriesService from "@/app/services/countries.service";
import { CountryCard } from "@/app/components/country/country-card";
import { PopulationChart } from "@/app/components/population-chart/population-chart";
import { CountryFullInfo } from "@/app/types/types";
import { ErrorDisplay } from "@/app/components/error-display/error-display";
import { Loader } from "@/app/components/loader/loader";
import { useFetchData } from "@/app/hooks/use-fetch-data";

import styles from "./page.module.css";

export default function CountryInfo() {
  const { code } = useParams();

  const {
    data: country,
    isLoading,
    errorMessage
  } = useFetchData<CountryFullInfo>(() => countriesService.getCountryInfo(code as string), null);

  return (
    <div className={styles.countryInfoContainer}>
      {isLoading ? (
        <Loader />
      ) : country ? (
        <div>
          <header className={styles.header}>
            <div className={styles.countryHeader}>
              {country.flagUrl && (
                <Image
                  src={country.flagUrl}
                  alt={code as string}
                  width={100}
                  height={0}
                  layout="intrinsic"
                />
              )}
              <h1 className={styles.countryName}>{country.officialName}</h1>
            </div>
            <Link className={styles.button} href="/countries">
              Back to Countries
            </Link>
          </header>
          <div className={styles.commonInfo}>
            <div className={styles.container}>
              <h2 className={styles.title}>Common Name</h2>
              <div className={styles.info}>{country.commonName}</div>
            </div>
            <div className={styles.container}>
              <h2 className={styles.title}>Region</h2>
              <div className={styles.info}>{country.region}</div>
            </div>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className={styles.container}>
              <h2 className={styles.title}>Borders</h2>
              <div className={`${styles.borders} ${styles.info}`}>
                {country.borders.map(border => (
                  <CountryCard
                    country={{
                      name: border.commonName,
                      countryCode: border.countryCode
                    }}
                    key={border.countryCode}
                  />
                ))}
              </div>
            </div>
          )}
          {country.population && (
            <div className={styles.container}>
              <h2 className={styles.title}>Population</h2>
              <PopulationChart populationCounts={country.population} />
            </div>
          )}
        </div>
      ) : (
        <ErrorDisplay message={errorMessage} />
      )}
    </div>
  );
}
