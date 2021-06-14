import React from 'react';
import { Template as TemplateModel } from 'src/utils/constants';
import { DonkeyApi, getDDMMYY } from 'src/utils/helpers';
import { NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useLoader } from 'src/store/useLoader';
import { useState } from 'react';
import { useAlert } from 'src/store/useAlert';

interface Props {}

const TemplateCard: React.FC<Props> = () => {
  const { setLoader } = useLoader();
  const { setAlerts } = useAlert();
  const [Templates, setTemplates] = useState<TemplateModel[]>([]);
  async function getTemplates() {
    setLoader(true);
    await DonkeyApi.get('/template/')
      .then((res: AxiosResponse<TemplateModel[]>) => setTemplates(res.data))
      .catch(() => setAlerts({ type: 'error', message: 'Unable to fetch templates !' }))
      .finally(() => setLoader(false));
  }

  useEffect(() => {
    (async () => {
      await getTemplates();
    })();
  }, []);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-3">
      {Templates?.map((template) => (
        <div
          key={template.id}
          className="bg-indigo-100 bg-opacity-95 p-4 rounded-lg | cursor-pointer | hover:bg-indigo-200  | transition-colors duration-500"
        >
          <div className="flex flex-col justify-center">
            <NavLink to={`/template/${template.id}`}>
              <p className="text-gray-900 dark:text-gray-300 text-xl font-bold">{template.title}</p>
              <p className="text-black dark:text-gray-100 text-justify text-sm">{template.id}</p>
              <p className="text-black dark:text-gray-100 text-justify text-sm">
                <span className="font-semibold">Last updated :</span>{' '}
                {getDDMMYY(template.updatedAt).time} , {getDDMMYY(template.updatedAt).date}
              </p>
            </NavLink>
          </div>
        </div>
      ))}{' '}
    </div>
  );
};

export default TemplateCard;
