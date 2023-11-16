import styled from 'styled-components';

const Wrapper = styled.button`
  background: transparent;
  border-color: transparent;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 22pt;
  .toggle-icon {
    font-size: 22pt;
    color: var(--text-color);
  }
`;
export default Wrapper;
