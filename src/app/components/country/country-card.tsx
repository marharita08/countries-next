import Link from 'next/link';

import { type Country } from '@/app/types/types';

import styles from './country-card.module.css';

type Properties = {
  country: Country;
}

const CountryCard: React.FC<Properties> = ({ country }) => {
  const { name, countryCode } = country;

  return (
    <div className={styles.country}>
      <div>{countryCode}</div>
      <Link href={`/countries/${countryCode}`} className={styles.card_country_name}>
        {name}
      </Link>
    </div>
  );
};

export { CountryCard };
