import Wrapper from '../assets/wrappers/PaymentInfo';

const PaymentInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="payment-icon">{icon}</span>
      <span className="payment-text">{text}</span>
    </Wrapper>
  );
};
export default PaymentInfo;
