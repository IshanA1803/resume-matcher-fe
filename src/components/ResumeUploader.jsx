import React, { useCallback, useState, useRef } from 'react';

export const ResumeUploader = ({ onFileUpload, darkMode }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }
    
    onFileUpload(file);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${dragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : darkMode 
            ? 'border-gray-600 hover:border-gray-500' 
            : 'border-gray-300 hover:border-gray-400'
        } 
        ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleChange}
      />
      <div className="space-y-3">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-12 w-12 mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="font-medium">Drop your resume here</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX files only (max 10MB)</p>
      </div>
    </div>
  );
};