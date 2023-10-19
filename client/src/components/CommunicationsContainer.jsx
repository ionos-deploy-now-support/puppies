import Communication from './Communication';
import Wrapper from '../assets/wrappers/CommunicationsContainer';
import { useCommunicationsContext } from '../pages/CommunicationsLayout';
import { useClientsContext } from '../pages/ClientsLayout';

const CommunicationsContainer = () => {
  const { communications, results, clientId } = useCommunicationsContext();
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  let clientFirstName = '';
  // if (client[0].clientFirstName) clientFirstName = client[0].clientFirstName;
  // const clientFirstName = client[0].clientFirstName;
  if (communications.length === 0) {
    return (
      <Wrapper>
        <h5>No communications entered yet for {clientFirstName}</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} {results > 1 ? 'Communications' : 'Communication record'}
        {` ${clientFirstName}`}
      </h5>
      <div className="communications">
        {communications.map((communication) => {
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
