import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import PrismHighlight from 'src/components/PrismHighlight';
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
    refreshInterval: 1200000,
    revalidateOnFocus: false,
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <PrismHighlight code={TemplateData?.markup} language={'html'} />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">d</div>
      </div>
    </div>
  );
};

export default Template;
