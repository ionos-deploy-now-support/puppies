import styled from 'styled-components';
const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
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
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    /* .logo {
      display: none;
    }
    .logo-text {
      display: block;
    } */
  }
  /* .dark-nav {
    --text-color: var(--dark-mode-text-color);
    --text-secondary-color: var(--dark-mode-text-secondary-color);
  } */

  /* a:link.dark-nav,
  a:visited.dark-nav {
    text-decoration: none;
    color: var(--dark-mode-text-color);
    --text-secondary-color: var(--dark-mode-text-secondary-color);
    font-size: 1.2rem;
    font-weight: 600;
  } */
  /* a:hover.dark-nav {
    border-radius: 5px;
  } */
`;
export default Wrapper;
