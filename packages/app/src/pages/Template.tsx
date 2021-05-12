import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import PrismHighlight from 'src/components/PrismHighlight';
import { useToken } from 'src/store/useToken';
import { Template as TemplateModel } from 'src/utils/constants';
import { getDDMMYY } from 'src/utils/helpers';
import { Liquid } from 'liquidjs';
interface Props {}

const Template: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useToken();
  const [code, setCode] = useState('');
  const [TemplateData, setTemplateData] = useState<TemplateModel>({
    title: '',
  });
  const [renderedTemplate, setRenderTemplate] = useState('');
  const firstUpdate = useRef(0);
  const liquid = new Liquid();
  const running = useRef(false);
  function getHeight() {
    return window.innerHeight - 170;
  }
  async function getTemplate() {
    axios({
      baseURL: import.meta.env.VITE_API,
      url: `/template/${id}`,
      method: 'get',
      headers: {
        'access-token': token,
      },
    })
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
    console.log(running.current);
    if (running.current) return;
    running.current = true;
    await axios({
      baseURL: import.meta.env.VITE_API,
      url: `/template/${id}/`,
      method: 'PUT',
      headers: {
        'access-token': token,
      },
      data: {
        ...TemplateData,
        createdAt: undefined,
        updatedAt: undefined,
        markup: codePayload,
      },
    })
      .then(async (res: AxiosResponse<TemplateModel>) => {
        running.current = false;
        console.log(res);
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
        await renderTemplate(code), await setTemplate(code);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [code]);

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <div className="container">
      <div>
        <input
          name="password"
          type="text"
          className="bg-gray-300 rounded-md mb-2 lg:w-auto w-full"
          value={TemplateData.title}
          placeholder="Untitled"
          onChange={(e) =>
            setTemplateData({ ...TemplateData, title: e.target.value })
          }
          onKeyDown={(e) => e.key === 'Enter' && setTemplate()}
        />{' '}
      </div>
      <p className="text-sm">
        <span className="font-semibold">Last updated : </span>
        {getDDMMYY(TemplateData?.updatedAt).time} ,{' '}
        {getDDMMYY(TemplateData?.updatedAt).date}{' '}
      </p>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:grid-flow-col lg:auto-cols-max relative pt-3"
        style={{ height: `${getHeight()}px`, maxHeight: `${getHeight()}px` }}
      >
        <>
          <PrismHighlight
            code={code}
            onCode={(code) => setCode(code)}
            language={'html'}
            minHeight={getHeight()}
          />
        </>
        <div
          style={{
            maxHeight: `${getHeight()}px`,
            msOverflowY: 'auto',
            overflowY: 'auto',
            padding: '10px',
            border: '2px solid #2563eb',
            borderRadius: '0.5rem',
          }}
        >
          <div
            style={{ all: 'revert' }}
            dangerouslySetInnerHTML={{ __html: renderedTemplate }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Template;
