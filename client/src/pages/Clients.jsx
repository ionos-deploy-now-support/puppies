import { ClientsContainer, ClientsSearchContainer } from '../components';

const Clients = () => {
  return (
    <div className="clients-page">
      <ClientsSearchContainer />
      <ClientsContainer />
    </div>
  );
};

export default Clients;
