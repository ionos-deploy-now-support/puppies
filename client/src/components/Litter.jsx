import { FaStickyNote } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import { SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/Litter';
import LitterInfo from './LitterInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Litter = ({
  _id,
  litterName,
  litterAKC,
  sireName,
  damName,
  litterConceived,
  litterDelivered,
  femalesBorn,
  femalesSurvived,
  malesBorn,
  malesSurvived,
  puppiesChocolate,
  puppiesYellow,
  puppiesBlack,
  litterNote
}) => {
  const dateConceived = day(litterConceived).format('MMM Do, YYYY');
  const dateDelivered = day(litterDelivered).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{litterName.charAt(0)}</div>
        <div className="info">
          <h5>{`${litterName}`}</h5>
          <p>{`AKC Litter #: ${litterAKC}`}</p>
          <p>
            {`Sire: ${sireName}`}
            <span>&emsp;&emsp;&nbsp;</span>
            {`Dam: ${damName}`}{' '}
          </p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <LitterInfo text={`Conceived: ${dateConceived}`} />
          <LitterInfo text={`Delivered: ${dateDelivered}`} />
          <LitterInfo text={`# Females: ${femalesBorn}`} />
          <LitterInfo text={`Survived: ${femalesSurvived}`} />
          <LitterInfo text={`# Males: ${malesBorn}`} />
          <LitterInfo text={`Survived: ${malesSurvived}`} />
          <LitterInfo text={`Black: ${puppiesBlack}`} />
          <LitterInfo text={`Chocolate: ${puppiesChocolate}`} />
          <LitterInfo text={`Yellow: ${puppiesYellow}`} />
          <LitterInfo icon={<FaStickyNote />} text={litterNote} />
        </div>
        <footer className="actions">
          <Link to={`../litter-edit/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../litter-delete/${_id}`}>
            <SubmitBtn formBtn btnText="delete" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Litter;
