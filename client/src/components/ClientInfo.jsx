import Wrapper from '../assets/wrappers/ClientInfo';

const ClientInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="client-icon">{icon}</span>
      <span className="client-text">{text}</span>
    </Wrapper>
  );
};
export default ClientInfo;
