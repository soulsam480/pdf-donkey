import React from 'react';
import { highlight as Highlight } from 'highlight.js';
import 'highlight.js/styles/dracula.css';

import { ReactCodeJar } from 'react-codejar';
interface Props {
  language: string;
  code: string;
  onCode: (code: string) => void;
  minHeight: number;
}

const PrismHighlight: React.FC<Props> = ({
  language,
  code,
  onCode,
  minHeight,
}) => {
  const highlight = (editor: HTMLElement): Record<string, any> => {
    let code = editor.textContent as string;
    editor.innerHTML = Highlight(code, { language: language }).value;
    return {};
  };
  return (
    <ReactCodeJar
      style={{
        color: 'white',
        backgroundColor: 'black',
        resize: 'none',
        padding: '10px',
        borderRadius: '0.5rem',
        maxHeight: `${minHeight}px`,
      }}
      code={code}
      onUpdate={(e) => onCode(e)}
      highlight={highlight}
    />
  );
};

export default PrismHighlight;
