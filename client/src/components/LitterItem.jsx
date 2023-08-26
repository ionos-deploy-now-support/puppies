import styles from './LitterItem.module.css';

function LitterItem({ litter }) {
  const { litterDelivered, litterAKC, sireName, damName } = litter;
  console.log(litter);
  return (
    <li className={styles.litterItem}>
      <span>{litterDelivered} </span>
      <span>{litterAKC}</span>
      <span>{sireName}</span>
      <span>{damName}</span>
    </li>
  );
}

export default LitterItem;
