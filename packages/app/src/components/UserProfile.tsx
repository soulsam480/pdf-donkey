import React, { useEffect, useState } from 'react';
import { useAlert } from 'src/store/useAlert';
import { useUser } from 'src/store/userContext';
import { classNames, diffMatcher, DonkeyApi } from 'src/utils/helpers';
import AppModal from './AppModal';

interface Props {
  isUserProfile: boolean;
  closeModal: () => void;
}

const UserProfile: React.FC<Props> = ({ isUserProfile, closeModal }) => {
  const { user, fetchUser } = useUser();
  const [isKey, setKey] = useState('');
  const [updatedUser, setUpdatedUser] = useState<{
    email?: string;
    name?: string;
    username?: string;
  }>({ name: '', email: '', username: '' });
  const { setAlerts } = useAlert();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setUpdatedUser({
      ...updatedUser,
      [target.name]: target.value,
    });
  };

  async function getApiKey() {
    try {
      await DonkeyApi.get('/user/key').then(async (res) => {
        setKey(res.data);
      });
    } catch (error) {
      setAlerts({
        type: 'error',
        message: 'Something wen wrong !',
      });
    }
  }

  async function UpdateUser() {
    const diffedData = diffMatcher(updatedUser, user);
    if (!diffedData) return;
    try {
      await DonkeyApi.patch('/user', {
        ...diffedData,
      }).then(async () => {
        await fetchUser();
        setUpdatedUser({ name: '', email: '', username: '' });
        setAlerts({
          type: 'success',
          message: 'Profile updated successfully !',
        });
      });
    } catch (error) {
      setUpdatedUser({ name: '', email: '', username: '' });
      setAlerts({
        type: 'error',
        message: 'User exists with same credentials !',
      });
    }
  }
  useEffect(() => {
    if (!isUserProfile) {
      setUpdatedUser({ name: '', email: '', username: '' });
      setKey('');
    }
  }, [isUserProfile]);
  return (
    <>
      <AppModal
        isModal={isUserProfile}
        closeModal={() => closeModal()}
        heading="My account"
        subheading="Leave blank to keep defaults."
      >
        <form
          onSubmit={(e) => (e.preventDefault(), UpdateUser())}
          className="grid grid-cols-1 gap-3"
        >
          <div>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={updatedUser.name}
              placeholder={user.name}
              onChange={handleInput}
              className="rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="email">Your E-mail</label>
            <input
              id="email"
              name="email"
              type="text"
              value={updatedUser.email}
              placeholder={user.email}
              onChange={handleInput}
              className="rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="username">Your username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={updatedUser.username}
              placeholder={user.username}
              onChange={handleInput}
              className="rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              className={classNames({
                'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg ':
                  true,
              })}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <p className="text-2xl font-bold">API key</p>
          <p className="text-sm text-gray-500 "> Your donkey API key to generate PDFs. </p>
          <div className="grid grid-cols-1 gap-6 pt-2">
            <input
              type="text"
              className={classNames({
                'rounded-md border-gray-400 border-2 p-2 flex-grow': true,
                'text-gray-500': !isKey,
              })}
              value={isKey ? isKey : 'Your API key xxxx.xxxx.xxx'}
              disabled
            />

            <div className="flex justify-end">
              <button
                className={classNames({
                  'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg ':
                    true,
                })}
                onClick={() => getApiKey()}
              >
                Get your Key
              </button>
            </div>
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default UserProfile;
