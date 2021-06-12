import React, { useEffect, useState } from 'react';
import Highlight from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { ReactCodeJar } from 'react-codejar';
import { html, js } from 'js-beautify';
interface Props {
  language: string;
  code: string;
  onCode: (code: string) => void;
  minHeight?: number;
}

const PrismHighlight: React.FC<Props> = ({ language, code, onCode, minHeight }) => {
  const [localCode, setLocalCode] = useState(code);
  const highlight = (editor: HTMLElement): Record<string, any> => {
    let code = editor.textContent as string;
    editor.innerHTML = Highlight.highlight(code, { language }).value;
    return {};
  };
  function handleChangeCode(val: string) {
    if (val === code) return;
    onCode(
      language === 'html'
        ? html(val, {
            preserve_newlines: true,
          })
        : js(val, {
            preserve_newlines: true,
          }),
    );
  }
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => handleChangeCode(localCode), 2000);
    return () => clearTimeout(timeout);
  }, [localCode]);
  return (
    <ReactCodeJar
      style={{
        color: 'white',
        backgroundColor: 'black',
        resize: 'none',
        padding: '10px',
        borderRadius: '0.5rem',
        maxHeight: minHeight ? `${minHeight}px` : 'auto',
      }}
      code={code}
      onUpdate={(e) => setLocalCode(e)}
      highlight={highlight}
    />
  );
};

export default PrismHighlight;