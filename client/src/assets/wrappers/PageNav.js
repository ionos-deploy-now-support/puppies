import styled from 'styled-components';
const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 4rem;
    max-width: 40em;
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: var(#ffffff);
    font-size: 1.2rem;
    font-weight: 600;
  }
  a.active {
    color: var(--green-dark);
    background-color: var(--green-light);
  }

  a.ctaLink:link,
  a.ctaLink:visited {
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 0.8rem 2rem;
    border-radius: 7px;
  }
  @media (min-width: 992px) {
  }
`;
export default Wrapper;
