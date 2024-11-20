export interface Field {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "number" | "checkbox";
    required?: boolean;
  }
  
  export interface JsonSchema {
    title: string;
    fields: Field[];
  }
  