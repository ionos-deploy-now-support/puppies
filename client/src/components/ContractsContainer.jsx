import Contract from './Contract';
import Wrapper from '../assets/wrappers/ContractsContainer';
import { useContractsContext } from '../pages/ContractsLayout';
import { useClientsContext } from '../pages/ClientsLayout';

const ContractsContainer = () => {
  const { contracts, results, clientId } = useContractsContext();
  const { clients } = useClientsContext();
  const client = clients.filter((client) => {
    return client._id === clientId;
  });
  let clientFirstName = '';
  // if (client[0].clientFirstName) clientFirstName = client[0].clientFirstName;
  // const clientFirstName = client[0].clientFirstName;
  if (contracts.length === 0) {
    return (
      <Wrapper>
        <h5>No contracts entered yet for {clientFirstName}</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} {results > 1 ? 'Contracts' : 'Contract record'}
        {` ${clientFirstName}`}
      </h5>
      <div className="contracts">
        {contracts.map((contract) => {
          return (
            <div key={contract._id}>
              <Contract key={contract._id} {...contract} />
              <hr />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ContractsContainer;
