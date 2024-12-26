import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const ProgrammingQuestionEditor = ({
  value,
  onChange,
  language = 'python',
  readOnly = false
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleEditorChange = (value) => {
    onChange(value);
  };

  const templates = {
    python: '# Write your Python code here\n\ndef solution():\n    # Your code here\n    pass\n\n# Example usage\nif __name__ == "__main__":\n    solution()',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}',
    java: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
    c: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="language-select" className="font-medium">
          Select Language:
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden h-[500px]">
        <Editor
          height="100%"
          defaultValue={value || templates[selectedLanguage]}
          value={value}
          language={selectedLanguage}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            readOnly: readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            lineNumbers: "on",
            renderLineHighlight: "all",
            quickSuggestions: true,
            folding: true,
          }}
        />
      </div>
    </div>
  );
};

export default ProgrammingQuestionEditor;