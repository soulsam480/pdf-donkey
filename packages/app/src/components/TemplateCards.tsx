import React from 'react';
import { Template as TemplateModel } from 'src/utils/constants';
import { useToken } from 'src/store/useToken';
import useSwr from 'swr';
import styled from 'styled-components';
import { getDDMMYY } from 'src/utils/helpers';
import { colors } from 'src/styles/variables';
import { NavLink } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';

const TemplateCardStyle = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
  .template-card {
    background-color: ${colors.prd};
    padding: 12px;
    border-radius: 6px;
  }
  .col-xs-12,
  .col-sm-12 {
    padding: 10px;
  }
`;

interface Props {}

const TemplateCard: React.FC<Props> = () => {
  const { token } = useToken();
  async function fetcher(): Promise<TemplateModel[]> {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: import.meta.env.VITE_API as string,
        url: `/template/`,
        method: 'get',
        headers: {
          'access-token': token,
        },
      })
        .then((res: AxiosResponse<TemplateModel[]>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  const { data: Templates } = useSwr('/template/', () => fetcher(), {
    refreshInterval: 60000,
  });

  return (
    <TemplateCardStyle className="row">
      {Templates?.map((template) => (
        <div
          className="col-xs-12 col-sm-12 col-md-4 col-lg-3"
          key={template.id}
        >
          <NavLink to={`/template/${template.id}`}>
            <div className="template-card">
              <h2 className="title">{template.title} </h2>
              <p className="id">
                <b>ID : </b> {template.id}
              </p>
              <small className="updated">
                {' '}
                <b>Last updated : </b> {getDDMMYY(template.updatedAt)}
              </small>
            </div>
          </NavLink>
        </div>
      ))}
    </TemplateCardStyle>
  );
};

export default TemplateCard;
