import PuppyHealthEvent from './PuppyHealthEvent';
import Wrapper from '../assets/wrappers/PuppyHealthEventsContainer';
import { usePuppiesContext } from '../pages/PuppiesLayout';
import { usePuppyHealthEventsContext } from '../pages/PuppyHealthEvents';
import PuppyHealthEventsPageBtnContainer from './PuppyHealthEventsPageBtnContainer';

const PuppyHealthEventsContainer = () => {
  const { data } = usePuppyHealthEventsContext();
  const puppyHealthEvents = data.puppyHealthEvents;
  const { results, filteredResults, numPages, puppyTempName } = data;
  console.log(puppyHealthEvents);

  if (puppyHealthEvents.length === 0) {
    return (
      <Wrapper>
        <p>No health events entered yet for {puppyTempName}</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {puppyHealthEvents.length}{' '}
        {puppyHealthEvents.length > 1 ? 'health records' : 'health record'}
        {` for ${puppyTempName}`}
        {filteredResults !== results && ` and found ${filteredResults} matching search`}
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
      {numPages > 1 && <PuppyHealthEventsPageBtnContainer />}
    </Wrapper>
  );
};
export default PuppyHealthEventsContainer;
