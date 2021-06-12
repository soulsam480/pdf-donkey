import React from 'react';
import { Template as TemplateModel } from 'src/utils/constants';
import { getDDMMYY } from 'src/utils/helpers';

interface Props {
  TemplateData: TemplateModel;
  setTemplateData: (val: any) => void;
  setTemplate: () => void;
  setDownloadModal: () => void;
  setModal: () => void;
  setRichMode: () => void;
  richMode: 'code' | 'rich';
}

const TemplateMenu: React.FC<Props> = ({
  TemplateData,
  setTemplateData,
  setDownloadModal,
  setModal,
  setRichMode,
  setTemplate,
  richMode,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 lg:grid-flow-col lg:auto-cols-max relative pt-3 items-center">
        <div>
          <input
            name="password"
            type="text"
            className="bg-gray-300 rounded-md mb-2 lg:w-auto w-full"
            value={TemplateData.title}
            placeholder="Untitled"
            onChange={(e) => setTemplateData({ ...TemplateData, title: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && setTemplate()}
          />{' '}
          <p className="text-sm">
            <span className="font-semibold">Last updated : </span>
            {getDDMMYY(TemplateData?.updatedAt).time} , {getDDMMYY(TemplateData?.updatedAt).date}{' '}
          </p>
        </div>
        <div className="text-left lg:text-right flex flex-row justify-end">
          <button
            className="bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg "
            onClick={() => setDownloadModal()}
          >
            Download
          </button>
          <button
            className="bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg "
            onClick={() => setModal()}
          >
            Settings
          </button>
          <button
            className="bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg "
            onClick={() => setRichMode()}
          >
            {richMode !== 'rich' ? 'Rich' : 'Code'} mode
          </button>
        </div>
      </div>
    </>
  );
};

export default TemplateMenu;
