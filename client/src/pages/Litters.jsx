import { LittersContainer, LittersSearchContainer } from '../components';

const Litters = () => {
  return (
    <div className="litters-page">
      <LittersSearchContainer />
      <LittersContainer />
    </div>
  );
};

export default Litters;
