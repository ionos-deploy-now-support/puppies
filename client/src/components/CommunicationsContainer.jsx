import Communication from './Communication';
import Wrapper from '../assets/wrappers/CommunicationsContainer';
import { useCommunicationsContext } from '../pages/CommunicationsLayout';
import { useClientsContext } from '../pages/ClientsLayout';

const CommunicationsContainer = () => {
  const { communicationsObj } = useCommunicationsContext();
  const clientId = communicationsObj[0].client;
  const { clients } = useClientsContext();
  const client = clients.filter((obj) => {
    return obj._id === clientId;
  });
  const clientFirstName = client[0].clientFirstName;

  if (communicationsObj.length === 0) {
    return (
      <Wrapper>
        <h5>No communications entered yet for {clientFirstName}</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {communicationsObj.length}{' '}
        {communicationsObj.length > 1 ? 'communications' : 'communication record'}
        {` for ${clientFirstName}`}
      </h5>
      <div className="communications">
        {communicationsObj.map((communication) => {
          return (
            <div key={communication._id}>
              <Communication key={communication._id} {...communication} />
              <hr />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default CommunicationsContainer;
