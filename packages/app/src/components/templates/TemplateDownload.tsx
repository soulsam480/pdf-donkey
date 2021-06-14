import React, { useState } from 'react';
import { useAlert } from 'src/store/useAlert';
import { classNames, DonkeyApi } from 'src/utils/helpers';
import AppModal from 'src/components/AppModal';
import PrismHighlight from 'src/components/templates/PrismHighlight';

interface Props {
  isModal: boolean;
  closeModal: () => void;
  templateId: string;
  templateTitle?: string;
}

const DownloadTemplate: React.FC<Props> = ({ closeModal, isModal, templateId, templateTitle }) => {
  const [templateData, setTemplateData] = useState('{}');
  const { setAlerts } = useAlert();
  async function getTemplatePdf() {
    try {
      await DonkeyApi.post(
        `/pdf/${templateId}/`,
        {
          templateData: {
            ...JSON.parse(templateData),
          },
        },
        {
          responseType: 'arraybuffer',
        },
      ).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${templateTitle || templateId}.pdf`);
        document.body.appendChild(link);
        link.click();
        setTemplateData('{}');
      });
    } catch (error) {
      setAlerts({
        type: 'error',
        message: 'Something went wrong !',
      });
    }
  }
  return (
    <>
      <AppModal isModal={isModal} closeModal={() => closeModal()} heading="Generate PDF">
        <div className="bg-red-50 px-3 py-2 rounded-md text-xs text-red-700 border border-red-200">
          <span className="font-bold">!</span> The data should be in JSON format.
        </div>
        <div className="py-2">
          <PrismHighlight
            code={templateData}
            language={'json'}
            onCode={(e) => setTemplateData(e)}
            isDebounce={0}
          />
        </div>
        <div className="flex justify-end">
          <button
            className={classNames({
              'bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out p-3 text-white rounded-lg ':
                true,
              'disabled:opacity-50 cursor-not-allowed': !Object.keys(
                JSON.parse(JSON.stringify(templateData)),
              ),
            })}
            onClick={() => getTemplatePdf()}
            disabled={!Object.keys(JSON.parse(JSON.stringify(templateData)))}
          >
            Submit
          </button>
        </div>
      </AppModal>
    </>
  );
};

export default DownloadTemplate;
