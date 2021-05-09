import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import TemplateCards from 'src/components/TemplateCards';
import { useUser } from 'src/store/userContext';
import { useToken } from 'src/store/useToken';
import styled from 'styled-components';

const StyledModal = styled.div`
  display: none;
  position: fixed;
  background-color: #87838399;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s;
  & > div {
    max-width: 600px;
    margin: 4em auto;
    width: auto;
    position: relative;
    padding: 1em;
    background: white;
    border-radius: 6px;
    @media (max-width: 768px) {
      margin: 10em 0.5em;
    }
    button {
      margin: 0 2px;
    }
  }
`;

interface Props {}

const User: React.FC<Props> = () => {
  const { user } = useUser();
  const { token } = useToken();
  const { push } = useHistory();
  const [isModal, setModal] = useState(false);
  const [newTemplate, setTemplate] = useState({ title: '', markup: '' });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setTemplate({
      ...newTemplate,
      [target.name]: target.value,
    });
  };

  async function cerateTemplate() {
    axios({
      baseURL: import.meta.env.VITE_API as string,
      url: `/template/`,
      method: 'post',
      headers: {
        'access-token': token,
      },
      data: {
        ...newTemplate,
      },
    })
      .then(
        (res) => (
          setModal(false),
          push(`/template/${res.data.id}`),
          setTemplate({ markup: '', title: '' })
        ),
      )
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <StyledModal style={{ display: isModal ? 'block' : 'none' }}>
        <div>
          <h3>Create a new template</h3>
          <form onSubmit={(e) => (e.preventDefault(), cerateTemplate())}>
            <div className="form-group">
              <input
                name="title"
                type="text"
                className="input"
                value={newTemplate.title}
                placeholder="Title"
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <input
                name="markup"
                type="textarea"
                className="input"
                value={newTemplate.markup}
                placeholder="Markup"
                onChange={handleInput}
              />
            </div>
            <div className="text-right">
              <button
                className="btn btn-red"
                onClick={() => setModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </StyledModal>

      <h2>
        <b>Dashboard</b>
        <button className="btn float-right" onClick={() => setModal(true)}>
          Create
        </button>
      </h2>
      <p>
        {' '}
        Hii <b>{user.name} </b> ! Welcome to PDF-Donkey.
      </p>
      <p>You can find all of your templates here.</p>
      <TemplateCards />
    </div>
  );
};

export default User;
