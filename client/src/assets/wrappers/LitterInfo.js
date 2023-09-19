import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .litter-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .litter-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
