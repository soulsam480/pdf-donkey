import React, { useEffect, useState } from 'react';
import Highlight from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { ReactCodeJar } from 'react-codejar';
import { html, js, css } from 'js-beautify';
interface Props {
  language: string;
  code: string;
  onCode: (code: string) => void;
  minHeight?: number;
  isDebounce?: number;
}

const PrismHighlight: React.FC<Props> = ({ language, code, onCode, minHeight, isDebounce }) => {
  const [localCode, setLocalCode] = useState(code);
  const highlight = (editor: HTMLElement): Record<string, any> => {
    let code = editor.textContent as string;
    editor.innerHTML = Highlight.highlight(code, { language }).value;
    return {};
  };
  function handleChangeCode(val: string) {
    if (val === code) return;
    switch (language) {
      case 'html':
        onCode(
          html(val, {
            preserve_newlines: true,
          }),
        );
        break;
      case 'css':
        onCode(
          css(val, {
            preserve_newlines: true,
          }),
        );
        break;
      default:
        onCode(
          js(val, {
            preserve_newlines: true,
          }),
        );
        break;
    }
  }
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => handleChangeCode(localCode), isDebounce || 2000);
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
      options={{ spellcheck: true, preserveIdent: true }}
    />
  );
};

export default PrismHighlight;
