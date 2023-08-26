import LitterItem from './LitterItem';
import styles from './LittersList.module.css';
import Spinner from './Spinner';

function LittersList({ litters, isLoading }) {
  if (isLoading) return <Spinner />;
  console.log(litters);
  return (
    <ul className={styles.littersList}>
      {litters &&
        litters.map((litter) => (
          <LitterItem litter={litter} key={litter._id} />
        ))}
    </ul>
  );
}

export default LittersList;
