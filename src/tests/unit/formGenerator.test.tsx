import React from 'react';
import '@testing-library/jest-dom';


import { render, fireEvent, screen } from '@testing-library/react';
import FormGenerator from '../../components/FormGenerator';  

test('displays error message for invalid JSON schema', () => {
  const invalidSchema = null; 
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

 
  expect(screen.getByText('Invalid JSON schema. Please fix the input.')).toBeInTheDocument();
});





describe('FormGenerator Error Handling', () => {
  const mockHandleFieldChange = jest.fn();
  const mockValidateForm = jest.fn();
  const mockHandleSubmit = jest.fn();

  const mockFormSchema = {
    formTitle: "Test Form",
    formDescription: "This is a test form",
    fields: [
      {
        id: "name",
        name: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address"
        }
      }
    ]
  };

  const mockFormData = {
    name: '',
    email: '',
  };

  const mockFormErrors = {
    name: 'Full Name is required.',
    email: 'Please enter a valid email address',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display error message for required fields', async () => {
    render(
      <FormGenerator
        formSchema={mockFormSchema}
        formData={mockFormData}
        formErrors={mockFormErrors}
        handleFieldChange={mockHandleFieldChange}
        validateForm={mockValidateForm}
        handleSubmit={mockHandleSubmit}
      />
    );

    // Check that error messages for required fields are displayed
    expect(screen.getByText('Full Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('should show error message when submitting invalid form', async () => {
    mockValidateForm.mockReturnValue(false); // Simulate form validation failure

    render(
      <FormGenerator
        formSchema={mockFormSchema}
        formData={mockFormData}
        formErrors={mockFormErrors}
        handleFieldChange={mockHandleFieldChange}
        validateForm={mockValidateForm}
        handleSubmit={mockHandleSubmit}
      />
    );

   
    fireEvent.submit(screen.getByRole('form'));

   
    expect(mockHandleSubmit).not.toHaveBeenCalled();
   
    expect(screen.getByText('Please fix the errors above.')).toBeInTheDocument();
  });

  
  
});










