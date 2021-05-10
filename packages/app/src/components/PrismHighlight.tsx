import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// import load from 'prismjs/components/';
interface Props {
  language?: string;
  code?: string;
}

const PrismHighlight: React.FC<Props> = ({ language, code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default PrismHighlight;
