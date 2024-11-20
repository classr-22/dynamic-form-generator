import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormSchema } from "../types/JsonSchema";

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const validationSchema = schema.fields.reduce((acc, field) => {
    if (field.required) {
      let validator = Yup.string().required(`${field.label} is required`);
      if (field.validation?.pattern) {
        validator = validator.matches(
          new RegExp(field.validation.pattern),
          field.validation.message || "Invalid format"
        );
      }
      acc[field.id] = validator;
    }
    return acc;
  }, {} as Record<string, Yup.AnySchema>);

  const initialValues = schema.fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {} as Record<string, string>);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <h2>{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id} className="form-group">
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.id}
              onChange={formik.handleChange}
              value={formik.values[field.id]}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              onChange={formik.handleChange}
              value={formik.values[field.id]}
            />
          )}
          {formik.touched[field.id] && formik.errors[field.id] && (
            <p className="error-text">{formik.errors[field.id]}</p>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormGenerator;
