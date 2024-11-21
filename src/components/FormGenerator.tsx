import React from 'react';
import { FormSchema } from '../types/JsonSchema';

interface FormGeneratorProps {
  formSchema: FormSchema | null;
  formData: Record<string, any>;
  formErrors: Record<string, string>;
  handleFieldChange: (fieldId: string, value: any) => void;
  validateForm: () => boolean;
  handleSubmit: (event: React.FormEvent) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  formSchema,
  formData,
  formErrors,
  handleFieldChange,
  validateForm,
  handleSubmit
}) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate the form before submitting
    if (validateForm()) {
      // Log form data to the console
      console.log('Form Data Submitted:', formData);

      // Call the original handleSubmit function to handle further form submission logic
      handleSubmit(event);
    }
  };

  const renderForm = () => {
    if (!formSchema) return <p>Invalid JSON schema. Please fix the input.</p>;

    return (
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">{formSchema.formTitle}</h1>
        <p className="text-lg mb-6">{formSchema.formDescription}</p>
        {formSchema.fields.map((field) => {
          const { id, type, label, required, placeholder, options } = field;
          const error = formErrors[id];

          switch (type) {
            case 'text':
            case 'email':
            case 'number':
              return (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="block text-sm font-medium">{label}{required && ' *'}</label>
                  <input
                    id={id}
                    type={type}
                    value={formData[id]}
                    onChange={(e) => handleFieldChange(id, e.target.value)}
                    placeholder={placeholder}
                    className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              );
            case 'textarea':
              return (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="block text-sm font-medium">{label}{required && ' *'}</label>
                  <textarea
                    id={id}
                    value={formData[id]}
                    onChange={(e) => handleFieldChange(id, e.target.value)}
                    placeholder={placeholder}
                    className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              );
            case 'select':
              return (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="block text-sm font-medium">{label}{required && ' *'}</label>
                  <select
                    id={id}
                    value={formData[id]}
                    onChange={(e) => handleFieldChange(id, e.target.value)}
                    className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="" disabled>Select an option</option>
                    {options?.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              );
            case 'radio':
              return (
                <div key={id} className="space-y-2">
                  <label className="block text-sm font-medium">{label}{required && ' *'}</label>
                  {options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`${id}-${option.value}`}
                        name={id}
                        value={option.value}
                        checked={formData[id] === option.value}
                        onChange={(e) => handleFieldChange(id, e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor={`${id}-${option.value}`} className="text-sm">{option.label}</label>
                    </div>
                  ))}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              );
            default:
              return null;
          }
        })}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    );
  };

  return <div>{renderForm()}</div>;
};

export default FormGenerator;