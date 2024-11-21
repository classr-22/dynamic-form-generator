# Dynamic Form Generator

## About the Project

The **Dynamic Form Generator** is a web application that takes a JSON schema and generates a styled, functional form in real-time. The application displays two panels side by side:
1. A JSON editor where users can modify the form schema.
2. A dynamically generated form that updates in real-time as the schema changes.

This project allows users to define forms using JSON and automatically see them rendered and validated, making it easy to create customizable and responsive forms without writing a single line of HTML code.

![image](https://github.com/user-attachments/assets/95097a6c-027b-48c5-984c-e876082841a6)


## Local Development Guide

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed on your machine (preferably the latest LTS version).
- Make sure you have [npm](https://www.npmjs.com/) installed, which comes with Node.js.

### Steps to Set Up the Project Locally

1. **Download or Clone the Project**
- Download the project zip file or clone it from the repository.

   ```bash
   git clone <repository-url>

2. **Open the Project in VS Code**
  - Open the project folder in Visual Studio Code.   

3. **Install Dependencies**
  - Run the following command in the terminal to install all necessary dependencies:

    ```bash
    npm install

4. **Run the Development Server**
- After the installation is complete, run the development server with:.

   ```bash
   npm run dev
- The application will be available at http://localhost:5173 by default.



## Running Tests
### To run the tests in this project, you have two options:

1. Unit Tests

- Run the following command to execute unit tests for the project:

  ```bash
   npm run test

2. End-to-End Tests

- For testing the full flow of the application (including the user interface and integrations), run:

  ```bash
   npm run test:e2e
 
## Example JSON Schemas
### Here is an example of a JSON schema you can use to generate a dynamic form:

  ```bash
   {
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" },
        { "value": "retail", "label": "Retail" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },
        { "value": "short", "label": "Short-term (1-3 months)" },
        { "value": "medium", "label": "Medium-term (3-6 months)" },
        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
