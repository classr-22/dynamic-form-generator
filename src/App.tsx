import React, { useState } from "react";
import JSONEditor from "./components/JsonEditor";
import FormGenerator from "./components/FormGenerator";
import { FormSchema } from "./types/JsonSchema";

const App: React.FC = () => {
  const [jsonValue, setJsonValue] = useState<string>(`{
  "formTitle": "Sample Form",
  "formDescription": "Fill out the fields below.",
  "fields": [
    { "id": "name", "type": "text", "label": "Name", "required": true, "placeholder": "Enter your name" }
  ]
}`);
  const [schema, setSchema] = useState<FormSchema | null>(JSON.parse(jsonValue));
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    try {
      setSchema(JSON.parse(value));
      setError(null);
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="app">
      <div className="editor-pane">
        <JSONEditor jsonValue={jsonValue} onChange={handleJsonChange} error={error} />
      </div>
      <div className="form-pane">
        {schema && !error ? (
          <FormGenerator schema={schema} />
        ) : (
          <p className="error-text">Fix JSON errors to preview the form.</p>
        )}
      </div>
    </div>
  );
};

export default App;
