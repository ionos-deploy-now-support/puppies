import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Contract';
import ContractInfo from './ContractInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useContractsContext } from '../pages/ContractsLayout';

day.extend(advancedFormat);

const Contract = ({
  _id,
  contractOpen,
  contractClose,
  contractType,
  contractPrice,
  contractNote,
  puppyPickOrder,
  puppy,
  puppyPickUp
}) => {
  const dateOpen = day(contractOpen).format('MMM Do, YYYY');
  const dateClose = day(contractClose).format('MMM Do, YYYY');
  const { contracts } = useContractsContext();
  const clientId = contracts[0].client;
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <ContractInfo text={`Opened: ${dateOpen}`} />
          {contractClose && <ContractInfo text={`Closed: ${dateClose}`} />}
          <ContractInfo text={`Type: ${contractType}`} />
          <ContractInfo text={`Price: $${contractPrice}`} />
          {puppyPickOrder && <ContractInfo text={`Pick Order: ${puppyPickOrder}`} />}
          {puppy && <ContractInfo text={`Puppy ID for now: ${puppy}`} />}
          {puppyPickUp && <ContractInfo text={`Puppy Pickup: ${puppyPickUp}`} />}
          {contractNote && <ContractInfo text={`Note: ${contractNote}`} />}
        </div>
        <footer className="actions">
          <Link to={`../${clientId}/contracts/contract-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../${clientId}/contracts/contract-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Contract;
