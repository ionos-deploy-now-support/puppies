import { PaymentsContainer, PaymentsAddSortContainer } from '../components';

const Payments = () => {
  return (
    <div className="litters-page">
      <PaymentsAddSortContainer />
      <PaymentsContainer />
    </div>
  );
};

export default Payments;
