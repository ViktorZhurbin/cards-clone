import '@toast-ui/editor/dist/toastui-editor.css';
import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';
// import 'codemirror/lib/codemirror.css';
// import 'highlight.js/styles/github.css';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// import hljs from 'highlight.js';

interface Props extends EditorProps {
  ref: React.MutableRefObject<any>;
}

const Tui: React.ComponentType<Props> = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);

export const Editor = () => {
  const [html, setHtml] = useState('');
  const editorRef = useRef(null);

  const handleChange = () => {
    if (editorRef?.current) {
      console.log(editorRef?.current);
      const htmlValue = editorRef.current?.getInstance().getHtml();
      htmlValue && setHtml(htmlValue);
    }
  };

  return (
    <Tui
      ref={editorRef}
      onChange={handleChange}
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="70vh"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      usageStatistics={false}
      //   plugins={[codeSyntaxHighlight, { hljs }]}
      toolbarItems={[
        'bold',
        'italic',
        'strike',
        'divider',
        'code',
        'codeblock',
        'divider',
        'heading',
        'hr',
        'divider',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'image',
        'link',
      ]}
    />
  );
};
