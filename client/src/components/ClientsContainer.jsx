import Client from './Client';
import Wrapper from '../assets/wrappers/ClientsContainer';
import { useClientsContext } from '../pages/Clients';
import ClientsPageBtnContainer from './ClientsPageBtnContainer';
const ClientsContainer = () => {
  const { data } = useClientsContext();
  const clients = data.data.docs;
  const { results, filteredResults, numPages } = data;
  console.log(clients, results);

  if (clients.length === 0) {
    return (
      <Wrapper>
        <h2>No clients to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} client{results > 1 && 's '}{' '}
        {filteredResults !== results && `and found ${filteredResults} matching search`}
      </h5>
      <div className="clients">
        {clients.map((client) => {
          return <Client key={client._id} {...client} />;
        })}
      </div>
      {numPages > 1 && <ClientsPageBtnContainer />}
    </Wrapper>
  );
};
export default ClientsContainer;
