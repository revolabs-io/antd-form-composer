import { CopyOutlined } from '@ant-design/icons';
import { App, Button, Card } from 'antd';
import MonacoEditor from 'react-monaco-editor';

type CodeBlockProps = {
  code: string;
  language?: string;
  height?: number | string;
};

function getEditorHeight(code: string, height?: number | string) {
  if (height !== undefined) {
    return height;
  }

  const lineCount = code.split('\n').length;
  return Math.min(560, Math.max(220, lineCount * 20 + 24));
}

export function CodeBlock({
  code,
  language = 'typescript',
  height,
}: CodeBlockProps) {
  const { message } = App.useApp();
  const editorHeight = getEditorHeight(code, height);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      message.success('Copied');
    } catch {
      message.error('Copy failed');
    }
  };

  return (
    <Card
      size="small"
      type="inner"
      extra={
        <Button
          type="link"
          size="small"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        >
          Copy
        </Button>
      }
      styles={{ body: { padding: 0 } }}
    >
      <MonacoEditor
        width="100%"
        height={editorHeight}
        language={language}
        theme="vs-dark"
        value={code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 13,
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          folding: true,
          renderLineHighlight: 'none',
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </Card>
  );
}
