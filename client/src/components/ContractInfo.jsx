import Wrapper from '../assets/wrappers/ContractInfo';

const ContractInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="contract-icon">{icon}</span>
      <span className="contract-text">{text}</span>
    </Wrapper>
  );
};
export default ContractInfo;
