import Client from './Client';
import Wrapper from '../assets/wrappers/ClientsContainer';
import { useClientsContext } from '../pages/Clients';
import PageBtnContainer from './PageBtnContainer';
const ClientsContainer = () => {
  const { data } = useClientsContext();
  console.log({ data });
  const clients = data.data.docs;

  // const { clients, totalClients, numOfPages } = data;
  console.log({ clients });
  if (clients.length === 0) {
    return (
      <Wrapper>
        <h2>No clients to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {/* <h5>
        {totalClients} client{clients.length > 1 && 's'} found
      </h5> */}
      <div className="clients">
        {clients.map((client) => {
          return <Client key={client._id} {...client} />;
        })}
      </div>
      {/* {numPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};
export default ClientsContainer;
