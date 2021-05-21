import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAlert } from 'src/store/useAlert';
const AppModal = React.lazy(() => import('src/components/AppModal'));
const TemplateCards = React.lazy(() => import('src/components/TemplateCards'));
import { useUser } from 'src/store/userContext';
import { DonkeyApi } from 'src/utils/helpers';

interface Props {}

const User: React.FC<Props> = () => {
  const { user } = useUser();
  const { push } = useHistory();
  const [isModal, setModal] = useState(false);
  const [newTemplate, setTemplate] = useState({ title: '', markup: '' });
  const { setAlerts } = useAlert();
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    setTemplate({
      ...newTemplate,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    if (!isModal) {
      setTemplate({
        markup: '',
        title: '',
      });
    }
  }, [isModal]);

  async function cerateTemplate() {
    DonkeyApi.post(`/template/`, {
      ...newTemplate,
    })
      .then(
        (res) => (
          setModal(false),
          setAlerts({
            message: `Template ${res.data.title} is created successfully !`,
            type: 'success',
          }),
          setTemplate({ markup: '', title: '' }),
          push(`/template/${res.data.id}`)
        ),
      )
      .catch(
        (err) => (
          console.log(err),
          setAlerts({ message: err.response.data, type: 'error' })
        ),
      );
  }
  return (
    <div className="container">
      <AppModal
        isModal={isModal}
        closeModal={() => setModal(false)}
        heading={'Create new Template'}
      >
        <form
          onSubmit={(e) => (e.preventDefault(), cerateTemplate())}
          className="grid grid-cols-1 gap-6"
        >
          <input
            name="title"
            type="text"
            value={newTemplate.title}
            placeholder="Title"
            onChange={handleInput}
            className="rounded-md"
          />

          <textarea
            name="markup"
            value={newTemplate.markup}
            placeholder="Markup"
            onChange={handleInput}
            className="rounded-md"
          />
          <div className="flex justify-end">
            <button
              className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white ml-1  transition duration-200 ease-in-out"
              onClick={() => setModal(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className={`p-2 rounded-md bg-indigo-500  text-white ml-1  transition duration-200 ease-in-out ${
                newTemplate.markup.length < 1 || newTemplate.title.length < 1
                  ? 'disabled:opacity-50 cursor-not-allowed'
                  : 'hover:bg-indigo-600'
              }`}
              type="submit"
              disabled={
                newTemplate.markup.length < 1 || newTemplate.title.length < 1
              }
            >
              Submit
            </button>
          </div>
        </form>
      </AppModal>
      <div>
        <button
          className="bg-indigo-500 p-2 hover:bg-indigo-600 float-right text-white rounded-md  transition duration-200 ease-in-out"
          onClick={() => setModal(true)}
        >
          Create
        </button>
        <p className="text-3xl font-bold">Dashboard</p>
      </div>
      <p className="text-lg">
        {' '}
        Hii <span className="font-bold"> {user.name} </span> ! Welcome to
        PDF-Donkey.
      </p>
      <p className="text-lg">You can find all of your templates here.</p>
      <TemplateCards />
    </div>
  );
};

export default User;
