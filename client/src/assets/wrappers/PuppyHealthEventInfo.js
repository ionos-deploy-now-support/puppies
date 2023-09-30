import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .puppy-health-event-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .puppy-health-event-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
