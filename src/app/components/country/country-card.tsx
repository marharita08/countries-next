import Link from 'next/link';

import { type Country } from '@/app/types/types';

import styles from './country-card.module.css';

type Properties = {
  country: Country;
}

const CountryCard: React.FC<Properties> = ({ country }) => {
  const { name, countryCode } = country;

  return (
    <Link href={`/countries/${countryCode}`} className={styles.card}>
      <div className={styles.country}>
        <div>{countryCode}</div>
        <div>{name}</div>
      </div>
    </Link>
  );
};

export { CountryCard };
