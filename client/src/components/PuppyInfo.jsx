import Wrapper from '../assets/wrappers/PuppyInfo';

const PuppyInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="puppy-icon">{icon}</span>
      <span className="puppy-text">{text}</span>
    </Wrapper>
  );
};
export default PuppyInfo;
