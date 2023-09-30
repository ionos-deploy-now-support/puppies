import Wrapper from '../assets/wrappers/PuppyHealthEventInfo';

const PuppyHealthEventInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="puppy-icon">{icon}</span>
      <span className="puppy-text">{text}</span>
    </Wrapper>
  );
};
export default PuppyHealthEventInfo;
