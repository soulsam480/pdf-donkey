import React, { useState } from 'react';
import { Template as TemplateModel } from 'src/utils/constants';
import { getDDMMYY } from 'src/utils/helpers';
import AppIcon from 'src/components/AppIcon';

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
  const [editTitle, setEditTitle] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 lg:grid-flow-col lg:auto-cols-max relative pt-3 items-center">
        <div>
          {editTitle ? (
            <div className="flex items-center mb-2">
              <input
                name="password"
                type="text"
                className="bg-gray-300 rounded-md lg:w-auto w-full flex-1 mr-2"
                value={TemplateData.title}
                placeholder="Untitled"
                onChange={(e) => setTemplateData({ ...TemplateData, title: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && setTemplate()}
              />
              <div className="flex-none">
                <AppIcon
                  title="Submit"
                  icon="ion:checkmark"
                  className="text-indigo-700 hover:bg-indigo-50 transition-all ease-in-out mr-1 cursor-pointer rounded-full"
                  onClick={() => (setTemplate(), setEditTitle(false))}
                  size="24px"
                />
                <AppIcon
                  title="Cancel editing"
                  icon="ion:close"
                  className="text-indigo-700 hover:bg-indigo-50 transition-all ease-in-out mr-1 cursor-pointer rounded-full"
                  onClick={() => setEditTitle(false)}
                  size="24px"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="text-xl font-bold">
                {TemplateData.title}{' '}
                <AppIcon
                  title="Edit title"
                  icon="ion:create-outline"
                  className="text-indigo-500 hover:bg-indigo-50 transition-all ease-in-out cursor-pointer"
                  onClick={() => setEditTitle(true)}
                  size="24px"
                />
              </div>
            </>
          )}{' '}
          <p className="text-sm">
            <span className="font-semibold">Last updated : </span>
            {getDDMMYY(TemplateData?.updatedAt).time} , {getDDMMYY(TemplateData?.updatedAt).date}{' '}
          </p>
        </div>
        <div className="text-left lg:text-right flex flex-row justify-end">
          <button
            className="items-center bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out px-2 py-1 rounded-lg "
            onClick={() => setDownloadModal()}
            title="Download"
          >
            <AppIcon
              icon="ion:cloud-download-outline"
              className="text-white transition-all ease-in-out cursor-pointer"
              size="24px"
            />
          </button>
          <button
            className="items-center bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out px-2 py-1 rounded-lg "
            onClick={() => setModal()}
            title="Settings"
          >
            <AppIcon
              icon="ion:settings-outline"
              className="text-white transition-all ease-in-out cursor-pointer"
              size="24px"
            />
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
