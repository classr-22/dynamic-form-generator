import React from 'react';
import '@testing-library/jest-dom';

import { render, fireEvent, screen } from '@testing-library/react';
import FormGenerator from '../../components/FormGenerator';  

test('displays error message for invalid JSON schema', () => {
  const invalidSchema = null; // Simulating invalid JSON schema
  const formData = {};
  const formErrors = {};

  const handleFieldChange = jest.fn();
  const validateForm = jest.fn().mockReturnValue(true);
  const handleSubmit = jest.fn();

  render(
    <FormGenerator 
      formSchema={invalidSchema} 
      formData={formData} 
      formErrors={formErrors} 
      handleFieldChange={handleFieldChange} 
      validateForm={validateForm} 
      handleSubmit={handleSubmit} 
    />
  );

  // Expect the error message to appear on screen
  expect(screen.getByText('Invalid JSON schema. Please fix the input.')).toBeInTheDocument();
});






