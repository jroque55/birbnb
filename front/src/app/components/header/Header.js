'use client'
import { useRouter } from 'next/navigation'
import './Header.css';
import LoginButton from '../loginButton/LoginButton';

const Header = (props) => {
  const router = useRouter();
  return (
    <header className="header-bg">
      <div className="header">
        <div className="header-section left">
          <button className="logo" onClick={() => router.replace('/')}>
            Birbnb
          </button>
        </div>
        <div className="header-section right">
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default Header;