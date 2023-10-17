import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import { useCommunicationsContext } from '../pages/CommunicationsLayout';

const CommunicationsAddSortContainer = () => {
  const { clientId } = useCommunicationsContext();
  // const clientId = communications[0].client;

  return (
    <Wrapper>
      <Form className="form">
        <Link
          to={`/dashboard/clients/${clientId}/communication-add`}
          className="btn form-btn"
          style={{ marginTop: '-2rem', marginBottom: '2rem' }}>
          <span>
            <BsPlusCircle className="icon" />
            new communication
          </span>
        </Link>
        <hr style={{ marginTop: '-.4rem', marginBottom: '.8rem' }} />
      </Form>
    </Wrapper>
  );
};
export default CommunicationsAddSortContainer;
