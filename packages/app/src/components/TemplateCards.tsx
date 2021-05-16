import React from 'react';
import { Template as TemplateModel } from 'src/utils/constants';
import useSwr from 'swr';
import { DonkeyApi, getDDMMYY } from 'src/utils/helpers';
import { NavLink } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

interface Props {}

const TemplateCard: React.FC<Props> = () => {
  async function fetcher(): Promise<TemplateModel[]> {
    return new Promise((resolve, reject) => {
      DonkeyApi({
        url: `/template/`,
        method: 'get',
      })
        .then((res: AxiosResponse<TemplateModel[]>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  const { data: Templates } = useSwr('/template/', () => fetcher(), {
    refreshInterval: 1200000,
    revalidateOnFocus: false,
  });

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-3">
      {Templates?.map((template) => (
        <div
          key={template.id}
          className="bg-blue-100 dark:bg-gray-800 bg-opacity-95 p-4 rounded-lg | cursor-pointer | dark:hover:bg-indigo-600  | transition-colors duration-500"
        >
          <div className="flex flex-col justify-center">
            <NavLink to={`/template/${template.id}`}>
              <p className="text-gray-900 dark:text-gray-300 text-xl font-bold">
                {template.title}
              </p>
              <p className="text-black dark:text-gray-100 text-justify text-sm">
                {template.id}
              </p>
              <p className="text-black dark:text-gray-100 text-justify text-sm">
                <span className="font-semibold">Last updated :</span>{' '}
                {getDDMMYY(template.updatedAt).time} ,{' '}
                {getDDMMYY(template.updatedAt).date}
              </p>
            </NavLink>
          </div>
        </div>
      ))}{' '}
    </div>
  );
};

export default TemplateCard;
