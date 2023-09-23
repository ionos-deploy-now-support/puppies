import Litter from './Litter';
import Wrapper from '../assets/wrappers/LittersContainer';
import { useLittersContext } from '../pages/LittersLayout';
import LittersPageBtnContainer from './LittersPageBtnContainer';
const LittersContainer = () => {
  const { data } = useLittersContext();
  const litters = data.data.docs;
  const { results, filteredResults, numPages } = data;

  if (litters.length === 0) {
    return (
      <Wrapper>
        <h2>No litters to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {results} {results > 1 ? 'litters' : 'litter'}{' '}
        {filteredResults !== results && `and found ${filteredResults} matching search`}
      </h5>
      <div className="litters">
        {litters.map((litter) => {
          return <Litter key={litter._id} {...litter} />;
        })}
      </div>
      {numPages > 1 && <LittersPageBtnContainer />}
    </Wrapper>
  );
};
export default LittersContainer;
