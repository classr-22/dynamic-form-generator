import React from "react";
import Editor from "@monaco-editor/react";

interface JSONEditorProps {
  jsonValue: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ jsonValue, onChange, error }) => {
  const handleEditorChange = (value?: string) => {
    onChange(value || "");
  };

  return (
    <div className="json-editor">
      <h2>JSON Editor</h2>
      <Editor
        height="90vh"
        defaultLanguage="json"
        theme="vs-dark"
        value={jsonValue}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false } }}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default JSONEditor;
