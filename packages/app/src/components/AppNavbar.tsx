import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useUser } from '../store/userContext';
import { clickOutsideToggle } from 'src/utils/hooks';
interface Props {}
const AppNavbar: React.FC<Props> = () => {
  const { push } = useHistory();
  const { isLoggedIn, user, setUser, setLogin } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [isContext, setContext] = useState(false);
  const userContext = useRef<HTMLDivElement>(null);
  function logout() {
    setUser({});
    setLogin(false);
    localStorage.removeItem('__token');
    push('/login');
  }
  clickOutsideToggle(userContext, isContext, setContext);
  return (
    <nav className="bg-gray-800 sticky top-0 z-20">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none "
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center sm:items-stretch justify-start">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center text-white font-bold ml-10 sm:ml-0"
            >
              <img
                src="/donkey-trans.png"
                alt="Donkey Icon"
                style={{ width: '40px' }}
              />{' '}
              <span className="sm:block hidden">PDF Donkey</span>
            </NavLink>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  className="hover:bg-gray-600 text-white px-3 py-2 rounded-md font-medium"
                  href="https://github.com/soulsam480/pdf-donkey"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                {isLoggedIn ? (
                  <>
                    <button
                      className="hover:bg-gray-600 text-white font-bold px-3 py-2 focus:outline-none rounded-md cursor-pointer"
                      id="user-menu-button"
                      onClick={() => setContext(!isContext)}
                    >
                      {user.name}
                    </button>

                    <div
                      className={` ${
                        !isContext
                          ? 'opacity-0 hidden pointer-events-none'
                          : 'opacity-100'
                      } user-context origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                      ref={userContext}
                    >
                      <NavLink
                        to="/user"
                        className="block px-4 py-2 text-sm hover:bg-indigo-100 text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                        activeClassName="bg-indigo-100"
                      >
                        Dashboard
                      </NavLink>
                      <a
                        className="block px-4 py-2 text-sm hover:bg-indigo-100 text-gray-700 cursor-pointer"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                        onClick={(e) => (e.preventDefault(), logout())}
                      >
                        Sign out
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="hover:bg-gray-600 text-white font-bold px-3 py-2 rounded-md"
                      id="user-menu-button"
                    >
                      Login/ Signup
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={isOpen ? 'sm:hidden' : 'hidden'} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            className="hover:bg-gray-600 text-white px-3 py-2 rounded-md block font-medium"
            href="https://github.com/soulsam480/pdf-donkey"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
