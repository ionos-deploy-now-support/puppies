import { BsAsterisk } from 'react-icons/bs';
import { FaStickyNote } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Puppy';
import PuppyInfo from './PuppyInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Puppy = ({
  _id,
  puppyTempName,
  puppyDOB,
  puppySurvived,
  puppySex,
  puppyColor,
  puppyCollar,
  puppyAKC,
  puppyNewName,
  puppyAskingPrice,
  puppyAvailable,
  puppyNote,
  litter,
  createdAt
}) => {
  const date = day(puppyDOB).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{puppyTempName.charAt(0)}</div>
        <div className="info">
          <h5>{`${puppyTempName} `}</h5>
          <p>
            {`Color: ${puppyColor}`}
            <span>&emsp;&emsp;&emsp;&nbsp;</span>
            {`Sex: ${puppySex}`}{' '}
          </p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PuppyInfo text={`Born: ${date}`} />
          <PuppyInfo text={`Litter: ${litter}`} />
          <PuppyInfo text={`Survived?: ${puppySurvived}`} />
          <PuppyInfo text={`Collar: ${puppyCollar}`} />
          <PuppyInfo text={`AKC: ${puppyAKC}`} />
          <PuppyInfo text={`New Name: ${puppyNewName}`} />
          <PuppyInfo text={`Asking Price: ${puppyAskingPrice}`} />
          <PuppyInfo text={`Available?: ${puppyAvailable}`} />
          <PuppyInfo icon={<FaStickyNote />} text={puppyNote} />
        </div>
        <footer className="actions">
          <Link to={`../puppy-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../puppy-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Puppy;
