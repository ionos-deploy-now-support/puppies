import Wrapper from '../assets/wrappers/CommunicationInfo';

const CommunicationInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="communication-icon">{icon}</span>
      <span className="communication-text">{text}</span>
    </Wrapper>
  );
};
export default CommunicationInfo;
