import { FC } from 'react';
import './CodeEditor.css';
import MonacoEditor from '@monaco-editor/react';
import * as prettier from 'prettier';
import parser from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';

interface Props {
  input: string;
  onChange(value: string): void;
}

const CodeEditor: FC<Props> = ({ input, onChange }) => {
  function handleEditorChange(value: string | undefined) {
    onChange(value as string);
  }
  async function handleFormat() {
    const formattedCode = await prettier.format(input, {
      parser: 'babel',
      plugins: [estree, parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    const noEmptyStringCode = formattedCode.replace(/\n$/, '');
    onChange(noEmptyStringCode);
  }

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={handleFormat}
      >
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        defaultLanguage='javascript'
        height='100%'
        theme='vs-dark'
        defaultValue=''
        value={input}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
