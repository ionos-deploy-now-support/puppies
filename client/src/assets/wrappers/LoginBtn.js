import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  font-size: 1rem;
  .login-btn {
    background: var(--primary-500);
    border-color: transparent;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    padding: 0.4rem;
  }
`;

export default Wrapper;
