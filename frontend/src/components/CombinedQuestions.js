import React, { useState } from 'react';
import { FileText, Code } from 'lucide-react';
import ProgrammingQuestions from './ProgrammingQuestions';
import MCQQuestions from './MCQQuestions';

const CombinedQuestions = () => {
  const [activeView, setActiveView] = useState('mcq');

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView('mcq')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'mcq'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            MCQ Questions
          </button>
          <button
            onClick={() => setActiveView('programming')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'programming'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code className="h-4 w-4 mr-2" />
            Programming Questions
          </button>
        </div>
        {activeView === 'mcq' ? <MCQQuestions /> : <ProgrammingQuestions />}
      </div>
    </div>
  );
};

export default CombinedQuestions;