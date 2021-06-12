import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Template as TemplateModel } from 'src/utils/constants';
import { DonkeyApi, getDDMMYY } from 'src/utils/helpers';
import { Liquid } from 'liquidjs';
import { useScreenWidth } from 'src/utils/hooks';
import { useAlert } from 'src/store/useAlert';
import PrismHighlight from 'src/components/templates/PrismHighlight';
import RichTextEditor from 'src/components/templates/RichText';
import DownloadTemplate from 'src/components/templates/TemplateDownload';
import TemplateSettings from 'src/components/templates/TemplateSettings';
import { useLoader } from 'src/store/useLoader';
interface Props {}

const Template: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState('');
  const { setLoader } = useLoader();
  const [richMode, setRichMode] = useState<'code' | 'rich'>('code');
  const [TemplateData, setTemplateData] = useState<TemplateModel>({
    title: '',
  });
  const [renderedTemplate, setRenderTemplate] = useState('');
  const [isModal, setModal] = useState(false);
  const [isDownloadModal, setDownloadModal] = useState(false);
  const [TemplateTestData, setTemplateTest] = useState('');
  const { width } = useScreenWidth();
  const liquid = new Liquid();
  const running = useRef(false);
  const { setAlerts } = useAlert();
  function getHeight() {
    return window.innerHeight - 170;
  }
  async function getTemplate() {
    setLoader(true);
    DonkeyApi.get(`/template/${id}`)
      .then(async (res: AxiosResponse<TemplateModel>) => {
        setTemplateData(res.data);
        setCode(res.data.markup as string);
        setTemplateTest(JSON.stringify(res.data.data));
        await renderTemplate(res.data.markup as string, res.data?.data);
        setLoader(false);
      })
      .catch((err: AxiosError) => {
        setAlerts({ message: 'Unable to get template', type: 'error' });
        console.log(err);
      });
  }
  async function setTemplate(
    codePayload: string = code,
    data: Record<string, any> = JSON.parse(TemplateTestData),
  ) {
    if (running.current) return;
    running.current = true;
    await DonkeyApi.put(`/template/${id}/`, {
      ...TemplateData,
      createdAt: undefined,
      updatedAt: undefined,
      markup: codePayload,
      data: data,
    })
      .then(async () => {
        running.current = false;
        setAlerts({
          type: 'success',
          message: 'Saved successfully !',
        });
        await getTemplate();
      })
      .catch((err) => {
        console.log(err);
        setAlerts({
          type: 'error',
          message: 'Some error occured !',
        });
      });
  }
  async function renderTemplate(code: string, data?: Record<string, any>) {
    return await liquid.parseAndRender(code, data).then((res) => {
      setRenderTemplate(res);
    });
  }
  async function handleTemplateTestData() {
    try {
      const josnEd = JSON.parse(TemplateTestData);
      await setTemplate(undefined, josnEd);
    } catch (error) {
      setAlerts({
        type: 'error',
        message: 'Error in data format !',
      });
      return;
    }
  }
  useEffect(() => {
    if (code === TemplateData.markup) return;
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(async () => {
      await renderTemplate(code)
        .then(async () => await setTemplate(code))
        .catch(() =>
          setAlerts({
            type: 'error',
            message: 'Template error !',
          }),
        );
    }, 2000);
    return () => clearTimeout(timeout);
  }, [code]);

  useEffect(() => {
    (async () => {
      await getTemplate();
    })();
  }, []);

  return (
    <div className="container">
      <DownloadTemplate
        isModal={isDownloadModal}
        closeModal={() => setDownloadModal(false)}
        templateId={id}
        templateTitle={TemplateData.title}
      ></DownloadTemplate>
      <TemplateSettings
        isModal={isModal}
        setModal={() => setModal(false)}
        handleTemplateTestData={() => handleTemplateTestData()}
        setTemplateTest={(e) => setTemplateTest(e)}
        templateTestData={TemplateTestData}
      ></TemplateSettings>
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
            onClick={() => setDownloadModal(true)}
          >
            Download
          </button>
          <button
            className="bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg "
            onClick={() => setModal(true)}
          >
            Settings
          </button>
          <button
            className="bg-indigo-500 mx-1 flex-auto lg:flex-initial hover:bg-indigo-600 transition duration-200 ease-in-out p-2 text-white rounded-lg "
            onClick={() => setRichMode(richMode === 'code' ? 'rich' : 'code')}
          >
            {richMode !== 'rich' ? 'Rich' : 'Code'} mode
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:grid-flow-col lg:auto-cols-max grid-flow-row relative pt-3"
        style={{
          height: width >= 1024 ? `${getHeight()}px` : '100%',
          maxHeight: width >= 1024 ? `${getHeight()}px` : undefined,
        }}
      >
        <>
          {richMode === 'rich' ? (
            <RichTextEditor
              code={code}
              setRichCode={(code) => setCode(code)}
              minHeight={width >= 1024 ? getHeight() : 650}
            />
          ) : (
            <PrismHighlight
              code={code}
              onCode={(code) => setCode(code)}
              language={'html'}
              minHeight={width >= 1024 ? getHeight() : 650}
            />
          )}
        </>
        <div
          style={{
            maxHeight: width >= 1024 ? `${getHeight()}px` : '650px',
            height: width >= 1024 ? undefined : '650px',
            msOverflowY: 'auto',
            overflowY: 'auto',
            padding: '10px',
            border: '2px solid #2563eb',
            borderRadius: '0.5rem',
          }}
        >
          <iframe srcDoc={renderedTemplate} width="100%" height="100%" frameBorder="0"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Template;
