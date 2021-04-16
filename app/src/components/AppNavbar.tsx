import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { userContext } from '../store/userContext';
import { colors } from '../styles/variables';

interface Props {
  //todo this is an optional prop, for an optional prop, the type is undefined or your specified type.
  //todo e.g color has an assigned type string but also a optional prop, so the type will be string or undefined.
  color?: string;
}
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
//todo to use a prop you can destructure it like this
//todo const AppNavbar: React.FC<Props> = ({color})

const AppNavbar: React.FC<Props> = () => {
  const userState = useContext(userContext);
  return (
    <Nav>
      <div className="left">
        <NavLink to="/" className="brand">
          {`PDF Donkey 🦙`}
        </NavLink>
        {userState?.userState.isLoggedIn && (
          <NavLink to="/template/all">My templates</NavLink>
        )}
      </div>
      {!userState?.userState.isLoggedIn ? (
        <div className="right">
          <NavLink to="/login">Login/Register</NavLink>
        </div>
      ) : (
        <div className="right">
          <NavLink to="/user">{userState.userState.user.username}</NavLink>
        </div>
      )}
    </Nav>
  );
};

export default AppNavbar;
