import Link from 'next/link';
import Logo from '../logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  );
}

export default MainNavigation;
