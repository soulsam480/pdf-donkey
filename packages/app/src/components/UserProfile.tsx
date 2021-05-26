import React, { useState } from 'react';
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
          className="grid grid-cols-1 gap-6"
        >
          <input
            name="name"
            type="text"
            value={updatedUser.name}
            placeholder={user.name}
            onChange={handleInput}
            className="rounded-md"
          />
          <input
            name="email"
            type="text"
            value={updatedUser.email}
            placeholder={user.email}
            onChange={handleInput}
            className="rounded-md"
          />
          <input
            name="username"
            type="text"
            value={updatedUser.username}
            placeholder={user.username}
            onChange={handleInput}
            className="rounded-md"
          />
          <div className="flex justify-end">
            <button
              className={classNames({
                'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-3 text-white rounded-lg ': true,
              })}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </AppModal>
    </>
  );
};

export default UserProfile;
