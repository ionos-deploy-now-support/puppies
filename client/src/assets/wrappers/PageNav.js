import styled from 'styled-components';
const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: var(--grey-600);
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
  .dark-nav {
    --text-color: var(--dark-mode-text-color);
    --text-secondary-color: var(--dark-mode-text-secondary-color);
  }

  a:link.dark-nav,
  a:visited.dark-nav {
    text-decoration: none;
    color: var(--dark-mode-text-color);
    --text-secondary-color: var(--dark-mode-text-secondary-color);
    font-size: 1.2rem;
    font-weight: 600;
  }
  a:hover.dark-nav {
    border: 2px solid white;
    border-radius: 5px;
    padding: 2px;
  }
`;
export default Wrapper;
