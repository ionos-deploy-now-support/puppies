import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 3em;

  p {
    font-weight: bold;
    line-height: 1.5;
    font-size: clamp(0.75rem, 1.5vw, 1.5rem);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
`;
export default Wrapper;
