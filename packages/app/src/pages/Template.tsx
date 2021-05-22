import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
const PrismHighlight = React.lazy(() => import('src/components/PrismHighlight'));
const RichTextEditor = React.lazy(() => import('src/components/RichText'));
import { Template as TemplateModel } from 'src/utils/constants';
import { DonkeyApi, getDDMMYY } from 'src/utils/helpers';
import { Liquid } from 'liquidjs';
import { useScreenWidth } from 'src/utils/hooks';
import { useAlert } from 'src/store/useAlert';
interface Props {}

const Template: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState('');
  const [richMode, setRichMode] = useState<'code' | 'rich'>('code');
  const [TemplateData, setTemplateData] = useState<TemplateModel>({
    title: '',
  });
  const [renderedTemplate, setRenderTemplate] = useState('');
  const { width } = useScreenWidth();
  const firstUpdate = useRef(0);
  const liquid = new Liquid();
  const running = useRef(false);
  const { setAlerts } = useAlert();
  function getHeight() {
    return window.innerHeight - 170;
  }
  async function getTemplate() {
    DonkeyApi.get(`/template/${id}`)
      .then(async (res: AxiosResponse<TemplateModel>) => {
        setTemplateData(res.data);
        setCode(res.data.markup as string);
        await renderTemplate(res.data.markup as string);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }
  async function setTemplate(codePayload: string = code) {
    if (running.current) return;
    running.current = true;
    await DonkeyApi.put(`/template/${id}/`, {
      ...TemplateData,
      createdAt: undefined,
      updatedAt: undefined,
      markup: codePayload,
    })
      .then(async (res: AxiosResponse<TemplateModel>) => {
        running.current = false;
        setAlerts({
          type: 'success',
          message: 'Saved successfully !',
        });
        await getTemplate();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function renderTemplate(code: string) {
    return await liquid.parseAndRender(code).then((res) => {
      setRenderTemplate(res);
    });
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (firstUpdate.current === 0) {
      firstUpdate.current = 1;
      return;
    }
    firstUpdate.current++;
    if (firstUpdate.current > 2) {
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
    }
    return () => clearTimeout(timeout);
  }, [code]);

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:grid-flow-col lg:auto-cols-max relative pt-3 items-center">
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
        <div className="text-left lg:text-right">
          <button
            className="bg-indigo-500 w-full lg:w-auto hover:bg-indigo-600 transition duration-200 ease-in-out p-3 text-white rounded-lg "
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
