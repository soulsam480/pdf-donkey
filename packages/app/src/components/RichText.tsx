import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
interface Props {
  code: string;
  setRichCode: (code: string) => void;
  minHeight: number;
}

const RichText: React.FC<Props> = ({ code, setRichCode, minHeight }) => {
  const editor = useRef(null);

  return (
    <div
      style={{
        maxHeight: `${minHeight}px`,
        position: 'relative',
      }}
    >
      <JoditEditor
        ref={editor}
        value={code}
        onBlur={(newContent) => setRichCode(newContent)}
      />
    </div>
  );
};

export default RichText;
