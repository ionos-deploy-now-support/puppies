import PuppyHealthEvent from './PuppyHealthEvent';
import Wrapper from '../assets/wrappers/PuppyHealthEventsContainer';
import { usePuppyHealthEventsContext } from '../pages/PuppyHealthEventsLayout';

const PuppyHealthEventsContainer = () => {
  const { puppyObj } = usePuppyHealthEventsContext();
  console.log(`Data object passed in usePuppyHealthEventsContext ${JSON.stringify(puppyObj)}`);
  const puppyHealthEvents = puppyObj.puppyHealthEvents;
  const { puppyTempName } = puppyObj;
  console.log(puppyHealthEvents);

  if (puppyHealthEvents.length === 0) {
    return (
      <Wrapper>
        <h5>No health events entered yet for {puppyTempName}</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {puppyHealthEvents.length}{' '}
        {puppyHealthEvents.length > 1 ? 'health records' : 'health record'}
        {` for ${puppyTempName}`}
      </h5>
      <div className="puppy-health-events">
        {puppyHealthEvents.map((puppyHealthEvent) => {
          return (
            <div key={puppyHealthEvent._id}>
              <PuppyHealthEvent key={puppyHealthEvent._id} {...puppyHealthEvent} />
              <hr />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default PuppyHealthEventsContainer;
