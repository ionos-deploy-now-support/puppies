import Puppy from './Puppy';
import Wrapper from '../assets/wrappers/PuppiesContainer';
import { usePuppiesContext } from '../pages/PuppiesLayout';
import PuppiesPageBtnContainer from './PuppiesPageBtnContainer';
const PuppiesContainer = () => {
  const { data } = usePuppiesContext();
  const puppies = data.data.docs;
  const { results, filteredResults, numPages } = data;
  console.log(puppies, results);

  if (puppies.length === 0) {
    return (
      <Wrapper>
        <h2>No puppies to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} {results > 1 ? 'puppies' : 'puppy'}{' '}
        {filteredResults !== results && `and found ${filteredResults} matching search`}
      </h5>
      <div className="puppies">
        {puppies.map((puppy) => {
          return <Puppy key={puppy._id} {...puppy} />;
        })}
      </div>
      {numPages > 1 && <PuppiesPageBtnContainer />}
    </Wrapper>
  );
};
export default PuppiesContainer;
