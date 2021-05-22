import React, { useRef } from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
interface Props {
  code: string;
  setRichCode: (code: string) => void;
  minHeight: number;
}

const RichText: React.FC<Props> = ({ code, setRichCode, minHeight }) => {
  const editorRef = useRef<null | any>(null);

  return (
    <div
      style={{
        maxHeight: `${minHeight}px`,
        position: 'relative',
      }}
    >
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={code}
        tinymceScriptSrc="https://cdn.jsdelivr.net/gh/soulsam480/self_hosted/tinymce.min.js"
        onEditorChange={(val, editor) => setRichCode(val)}
        init={{
          max_height: minHeight,
          height: minHeight,
          menu: {
            file: {
              title: 'File',
              items: 'print ',
            },
            view: {
              title: 'View',
              items: 'spellchecker | fullscreen',
            },
            insert: {
              title: 'Insert',
              items:
                'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
            },
          },
          menubar: 'file edit insert view format table',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'pagebreak',
          ],
          table_toolbar:
            'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
          toolbar:
            'undo redo | formatselect | tableinsertdialog' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | pagebreak',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  );
};

export default RichText;
