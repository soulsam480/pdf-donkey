import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Template as TemplateModel } from 'src/utils/constants';
import { DonkeyApi } from 'src/utils/helpers';
import { Liquid } from 'liquidjs';
import { useScreenWidth } from 'src/utils/hooks';
import { useAlert } from 'src/store/useAlert';
import PrismHighlight from 'src/components/templates/PrismHighlight';
import RichTextEditor from 'src/components/templates/RichText';
import DownloadTemplate from 'src/components/templates/TemplateDownload';
import TemplateSettings from 'src/components/templates/TemplateSettings';
import { useLoader } from 'src/store/useLoader';
import TemplateMenu from 'src/components/templates/TemplateMenu';
interface Props {}

const Template: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
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
        await renderTemplate(res.data);
      })
      .catch((err: AxiosError) => {
        setAlerts({ message: 'Unable to get template', type: 'error' });
        console.log(err);
      })
      .finally(() => setLoader(false));
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
      })
      .finally(() => (running.current = false));
  }
  async function deleteTemplate() {
    setLoader(true);
    try {
      await DonkeyApi.delete(`/template/${id}/`);
      setAlerts({
        type: 'success',
        message: 'Template Deleted successfully !',
      });
      push('/');
    } catch (error) {
      console.log(error);
      setAlerts({
        type: 'error',
        message: 'Some error occured !',
      });
    } finally {
      setLoader(false);
    }
  }
  async function renderTemplate(template: TemplateModel) {
    return await liquid
      .parseAndRender(`<style>${template.style}</style>${template.markup}`, template.data)
      .then((res) => {
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
      await renderTemplate({ ...TemplateData, markup: code })
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
      />
      <TemplateSettings
        isModal={isModal}
        setModal={() => setModal(false)}
        handleTemplateTestData={() => handleTemplateTestData()}
        setTemplateTest={(e) => setTemplateTest(e)}
        templateTestData={TemplateTestData}
        templateCss={TemplateData.style as string}
        setTemplateCss={(val) => setTemplateData({ ...TemplateData, style: val })}
        setTemplate={() => setTemplate()}
        templateTitle={TemplateData.title as string}
        deleteTemplate={() => deleteTemplate()}
      />
      <TemplateMenu
        setRichMode={() => setRichMode(richMode === 'code' ? 'rich' : 'code')}
        TemplateData={TemplateData}
        richMode={richMode}
        setDownloadModal={() => setDownloadModal(true)}
        setModal={() => setModal(true)}
        setTemplate={() => setTemplate()}
        setTemplateData={(val) => setTemplateData(val)}
      />
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
