import React, { useState } from 'react';
import { classNames } from 'src/utils/helpers';
import AppModal from 'src/components/AppModal';
import PrismHighlight from 'src/components/templates/PrismHighlight';

interface Props {
  isModal: boolean;
  setModal: () => void;
  templateTestData: string;
  setTemplateTest: (e: string) => void;
  handleTemplateTestData: () => Promise<void>;
  templateCss: string;
  setTemplateCss: (css: string) => void;
  setTemplate: () => void;
  templateTitle: string;
  deleteTemplate: () => void;
}

const TemplateSettings: React.FC<Props> = ({
  isModal,
  templateTestData,
  setTemplateTest,
  setModal,
  handleTemplateTestData,
  setTemplateCss,
  templateCss,
  setTemplate,
  templateTitle,
  deleteTemplate,
}) => {
  const [confirmText, setConfirmText] = useState('');
  return (
    <>
      <AppModal
        closeModal={() => setModal()}
        heading="Settings"
        subheading="Edit settings for template, sample data etc."
        isModal={isModal}
      >
        <div className="text-lg pb-3 font-semibold">Sample data</div>
        <div className="bg-red-50 px-3 py-2 rounded-md text-xs text-red-700 border border-red-200">
          <span className="font-bold">!</span> The data should be in JSON format.
        </div>
        <div className="py-2">
          <PrismHighlight
            code={templateTestData}
            language={'json'}
            onCode={(e) => setTemplateTest(e)}
            isDebounce={0}
          />
        </div>
        <div className="flex justify-end">
          <button
            className={classNames({
              'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg ':
                true,
            })}
            onClick={() => handleTemplateTestData()}
          >
            Save
          </button>
        </div>
        <div className="text-lg pb-3 font-semibold">Custom CSS</div>
        <div className="bg-red-50 px-3 py-2 rounded-md text-xs text-red-700 border border-red-200">
          <span className="font-bold">!</span> The data should be valid css.
        </div>
        <div className="py-2">
          <PrismHighlight
            code={templateCss}
            language={'css'}
            onCode={(e) => setTemplateCss(e)}
            isDebounce={0}
          />
        </div>
        <div className="flex justify-end">
          <button
            className={classNames({
              'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg ':
                true,
            })}
            onClick={() => setTemplate()}
          >
            Save
          </button>
        </div>
        <div className="text-lg pb-3 font-semibold">Delete template</div>
        <div className="bg-red-50 px-3 py-2 rounded-md text-xs text-red-700 border border-red-200">
          <span className="font-bold">!</span> Please type <b>{templateTitle}</b> to confirm.
        </div>
        <form
          className="py-3 grid grid-cols-1 gap-3"
          onSubmit={(e) => (e.preventDefault(), deleteTemplate())}
        >
          <input
            type="text"
            className="rounded-md w-full"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <div className="text-right">
            <div className="flex justify-end">
              <button
                className={classNames({
                  'bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out p-2 text-white rounded-lg ':
                    true,
                  'disabled:opacity-50 cursor-not-allowed': templateTitle !== confirmText,
                })}
                disabled={templateTitle !== confirmText}
                onClick={() => deleteTemplate()}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </AppModal>
    </>
  );
};

export default TemplateSettings;
