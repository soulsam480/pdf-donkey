import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../store/userContext';
import { colors } from '../styles/variables';

interface Props {}
const Nav = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  padding: 10px 0;
  background-color: ${colors.pr};
  z-index: 999;
  box-shadow: 0 1px 6px 0.5px rgba(145, 145, 145, 0.301);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    display: inline-block;
    padding: 0 5px;
    color: #000 !important;
    text-decoration: none;
    &:last-child {
      padding-right: 15px;
    }
  }
  .brand {
    padding: 0 15px;
    font-weight: bold;
    font-size: 20px;
  }
`;

const AppNavbar: React.FC<Props> = () => {
  const { isLoggedIn, user } = useUser();
  useEffect(() => {
    console.log(isLoggedIn);
  });
  return (
    <Nav>
      <div className="left">
        <NavLink to="/" className="brand">
          {`PDF Donkey 🦙`}
        </NavLink>
        {isLoggedIn && <NavLink to="/template/all">My templates</NavLink>}
      </div>
      {!isLoggedIn ? (
        <div className="right">
          <NavLink to="/login">Login/Register</NavLink>
        </div>
      ) : (
        <div className="right">
          <NavLink to="/user">{user.username}</NavLink>
        </div>
      )}
    </Nav>
  );
};

export default AppNavbar;
