import React from 'react';
import { classNames } from 'src/utils/helpers';
import AppModal from 'src/components/AppModal';
import PrismHighlight from 'src/components/PrismHighlight';

interface Props {
  isModal: boolean;
  setModal: () => void;
  templateTestData: string;
  setTemplateTest: (e: string) => void;
  handleTemplateTestData: () => Promise<void>;
}

const TemplateSettings: React.FC<Props> = ({
  isModal,
  templateTestData,
  setTemplateTest,
  setModal,
  handleTemplateTestData,
}) => (
  <>
    <AppModal
      closeModal={() => setModal()}
      heading="Settings"
      subheading="Edit settings for template, sample data etc."
      isModal={isModal}
    >
      <div className="text-lg pb-3 font-semibold">Sample data</div>
      <div className="bg-red-200 px-3 py-2 rounded-md text-xs text-gray-700 font-semibold">
        <span className="font-bold">!</span> The data should be in JSON format.
      </div>
      <div className="py-2">
        <PrismHighlight
          code={templateTestData}
          language={'json'}
          onCode={(e) => setTemplateTest(e)}
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
          Submit
        </button>
      </div>
    </AppModal>
  </>
);

export default TemplateSettings;
