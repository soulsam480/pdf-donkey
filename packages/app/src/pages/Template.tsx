import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { useToken } from 'src/store/useToken';
import { Template as TemplateModel } from 'src/utils/constants';
import useSWR from 'swr';

interface Props {}

const Template: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useToken();
  async function fetcher(): Promise<TemplateModel> {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: import.meta.env.VITE_API,
        url: `/template/${id}`,
        method: 'get',
        headers: {
          'access-token': token,
        },
      })
        .then((res: AxiosResponse<TemplateModel>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  const { data: TemplateData } = useSWR(`/template/${id}`, fetcher, {
    refreshInterval: 60000,
  });
  return <div className="container">{TemplateData?.id}</div>;
};

export default Template;
