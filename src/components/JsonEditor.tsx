import React from 'react';

interface JsonEditorProps {
  jsonInput: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonInput, handleInputChange }) => {
  return (
    <div className="flex-1 p-4">
      
      <textarea
        id="jsonEditor"
        value={jsonInput}
        onChange={handleInputChange}
        rows={20}
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
      />
    </div>
  );
};

export default JsonEditor;

