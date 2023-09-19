import Wrapper from '../assets/wrappers/LitterInfo';

const LitterInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="litter-icon">{icon}</span>
      <span className="litter-text">{text}</span>
    </Wrapper>
  );
};
export default LitterInfo;
