import React, { useState, useEffect } from 'react';
import FormGenerator from './components/FormGenerator';
import JsonEditor from './components/JsonEditor';
import { FormSchema } from './types/JsonSchema';
import './index.css';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name"
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address"
        }
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        required: true,
        options: [
          { value: "1-50", label: "1-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "201-1000", label: "201-1000 employees" },
          { value: "1000+", label: "1000+ employees" }
        ]
      },
      {
        id: "industry",
        type: "radio",
        label: "Industry",
        required: true,
        options: [
          { value: "tech", label: "Technology" },
          { value: "healthcare", label: "Healthcare" },
          { value: "finance", label: "Finance" },
          { value: "retail", label: "Retail" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "timeline",
        type: "select",
        label: "Project Timeline",
        required: true,
        options: [
          { value: "immediate", label: "Immediate (within 1 month)" },
          { value: "short", label: "Short-term (1-3 months)" },
          { value: "medium", label: "Medium-term (3-6 months)" },
          { value: "long", label: "Long-term (6+ months)" }
        ]
      },
      {
        id: "comments",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        placeholder: "Any other details you'd like to share..."
      }
    ]
  }, null, 2));

  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitMessage, setFormSubmitMessage] = useState<string>('');

  useEffect(() => {
    try {
      const parsedSchema: FormSchema = JSON.parse(jsonInput);
      setFormSchema(parsedSchema);
      setFormErrors({});
      setFormData(parsedSchema.fields.reduce((acc, field) => {
        acc[field.id] = field.type === 'checkbox' ? false : '';
        return acc;
      }, {} as Record<string, any>));
    } catch (error) {
      setFormSchema(null);
    }
  }, [jsonInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formSchema) return false;

    formSchema.fields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value) {
        errors[field.id] = `${field.label} is required.`;
      }
      if (field.validation && !new RegExp(field.validation.pattern).test(value)) {
        errors[field.id] = field.validation.message;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitMessage('Form submitted successfully!');
    } else {
      setFormSubmitMessage('Please fix the errors above.');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 p-6">
      <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">JSON Editor</h2>
        <JsonEditor jsonInput={jsonInput} handleInputChange={handleInputChange} />
      </div>

      {/* Form Preview Section */}
      <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Form Preview</h2>
        <FormGenerator
          formSchema={formSchema}
          formData={formData}
          formErrors={formErrors}
          handleFieldChange={handleFieldChange}
          validateForm={validateForm}
          handleSubmit={handleSubmit}
        />
        {formSubmitMessage && (
          <p className="mt-4 text-center text-green-500 font-semibold">{formSubmitMessage}</p>
        )}
      </div>
    </div>
  );
};

export default App;
