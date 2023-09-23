import { useLittersContext } from './LittersLayout';

const Test = () => {
  const { testme, litters } = useLittersContext();
  console.log(testme);
  return (
    <div>
      <h1>Test Page</h1>
      <div className="litters">
        {litters.map((litter) => {
          return (
            <p key={litter._id} {...litter}>
              {litter._id}
              {litter.litterName}
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default Test;
