import { FunctionComponent } from 'react'
import ReactQuill from 'react-quill'

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
  placeholder: string;
}

const Editor: FunctionComponent<EditorProps> = ({ content, setContent, placeholder }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '+1' }],
      ['link', 'image', 'code-block'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];

  return (
    <ReactQuill
      theme="snow"
      formats={formats}
      modules={modules}
      value={content}
      onChange={setContent}
      className="editor-input"
      placeholder={placeholder}
    />
  )
}

export default Editor;