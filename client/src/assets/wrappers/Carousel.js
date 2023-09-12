import styled from 'styled-components';

const Wrapper = styled.section`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  @media (min-width: 992px) {
  }
`;
export default Wrapper;
