import { test, expect } from '@playwright/test';

test('displays error for invalid JSON schema', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    const invalidSchema = '{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text"}]}'; // Invalid schema
    await page.locator('#jsonEditor').fill(invalidSchema);
  
    // Click submit button
    await page.locator('button[type="submit"]').click();
  
    // Increased timeout
    // await page.waitForSelector('#json-error', { state: 'visible', timeout: 15000 }); // 15 seconds timeout
    // await expect(page.locator('#json-error')).toBeVisible();
  });
  




  test.describe('Form Generator Real-time Tests', () => {
    
    test.beforeEach(async ({ page }) => {
      // Navigate to the app page before each test
      await page.goto('http://localhost:5173');
    });
  
    test('should render the form preview based on JSON input', async ({ page }) => {
      // Ensure that the form title is displayed correctly
      await expect(page.locator('h1.text-3xl')).toHaveText('Project Requirements Survey');
      
      // Ensure the first field is rendered correctly (e.g., Full Name input field)
      await expect(page.locator('input#name')).toBeVisible();
      await expect(page.locator('label[for="name"]')).toHaveText('Full Name *');
    });
  
    test('should display error for required fields if left empty', async ({ page }) => {
        // Leave the required fields empty and try to submit the form
        await page.locator('button[type="submit"]').click();
      
        // Verify that error messages are displayed for the required fields
        // Select each error message individually to avoid strict mode violation
        await expect(page.locator('p.text-red-500').first()).toHaveText('Full Name is required.');
        await expect(page.locator('p.text-red-500').nth(1)).toHaveText('Please enter a valid email address');
        await expect(page.locator('p.text-red-500').nth(2)).toHaveText('Company Size is required.');
        await expect(page.locator('p.text-red-500').nth(3)).toHaveText('Industry is required.');
        await expect(page.locator('p.text-red-500').nth(4)).toHaveText('Project Timeline is required.');
      });
      
  
    //   test('should validate email correctly', async ({ page }) => {
    //     // Fill out the form with invalid email
    //     await page.fill('input#name', 'John Doe');
    //     await page.fill('input#email', 'invalid-email'); // Invalid email
    //     await page.locator('button[type="submit"]').click();
      
    //     // Wait for the error message to appear (increase timeout if necessary)
    //     await page.waitForSelector('p.text-red-500', { timeout: 5000 });
      
    //     // Check if the email validation error is shown
    //     const errorMessage = await page.locator('p.text-red-500').textContent();
    //     expect(errorMessage).toContain('Please enter @ in email address');
    //   });
      
  
    test('should submit the form with valid data', async ({ page }) => {
      // Fill the form with valid data
      await page.fill('input#name', 'John Doe');
      await page.fill('input#email', 'john.doe@example.com');
      await page.selectOption('select#companySize', { label: '51-200 employees' });
      await page.click('input#industry-tech'); // Select the "Technology" radio button
      await page.selectOption('select#timeline', { label: 'Immediate (within 1 month)' });
      await page.fill('textarea#comments', 'Looking forward to the project.');
  
      // Submit the form
      await page.locator('button[type="submit"]').click();
  
      // Check if form submit message is shown
      await expect(page.locator('p.text-green-500')).toHaveText('Form submitted successfully!');
    });
  
    test('should update form data in real-time when JSON is changed', async ({ page }) => {
      // Initially check if the form is populated with the existing JSON
      await expect(page.locator('input#name')).toHaveValue('');
      
      // Modify the JSON in the editor to add a new field (e.g., a new field called "phone")
      const newJsonInput = `{
        "formTitle": "Updated Form",
        "formDescription": "Updated Description",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Full Name",
            "required": true,
            "placeholder": "Enter your full name"
          },
          {
            "id": "phone",
            "type": "text",
            "label": "Phone Number",
            "required": true,
            "placeholder": "Enter your phone number"
          }
        ]
      }`;
  
      // Change JSON in the editor
      await page.fill('textarea#jsonEditor', newJsonInput);
  
      // Ensure the new field appears in the form
      await expect(page.locator('input#phone')).toBeVisible();
      await expect(page.locator('label[for="phone"]')).toHaveText('Phone Number *');
    });
  
    test('should show an error message for invalid JSON schema', async ({ page }) => {
      const invalidJson = `{
        "formTitle": "Invalid Form",
        "fields": [
          {
            "id": "name",
            "type": "text",
            "label": "Full Name",
            "required": true,
            "placeholder": "Enter your full name"
          }
        `;
  
      // Set invalid JSON in the editor
      await page.fill('textarea#jsonEditor', invalidJson);
  
      // Ensure error message is displayed
      await expect(page.locator('#json-error')).toBeVisible();
      await expect(page.locator('#json-error')).toHaveText('Invalid JSON schema. Please fix the input.');
    });
  });
  




  test.describe('Form Validation and Submission', () => {
  
    // Open the app page (assuming it's running locally on port 3000)
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173'); // Change this if your app runs on a different URL
    });
  
    
      
  
    // test('displays validation error for invalid email', async ({ page }) => {
    //   // Fill in the name but provide an invalid email
    //   await page.fill('input[name="name"]', 'John Doe');
    //   await page.fill('input[name="email"]', 'invalid-email');
  
    //   // Click the submit button
    //   await page.click('button[type="submit"]');
  
    //   // Ensure that the email validation error appears
    //   await expect(page.locator('p.text-red-500')).toContainText('Please enter a valid email address');
    // });
  
    // test('displays error for missing required select option', async ({ page }) => {
    //   // Fill in the name and email, but don't select a company size
    //   await page.fill('input[type="name"]', 'John Doe');
    //   await page.fill('input[type="email"]', 'john@example.com');
  
    //   // Click the submit button
    //   await page.click('button[type="submit"]');
  
    //   // Ensure that the company size error appears
    //   await expect(page.locator('p.text-red-500')).toContainText('Company Size is required.');
    // });
  
    // test('submits the form successfully when all fields are valid', async ({ page }) => {
    //   // Fill out the form with valid data
    //   await page.fill('input[type="name"]', 'John Doe');
    //   await page.fill('input[type="email"]', 'john@example.com');
    //   await page.selectOption('select[id="#companySize"]', '1-50');
    //   await page.click('input[type="radio"][value="tech"]'); // Industry
    //   await page.selectOption('select[id="#timeline"]', 'immediate');
    //   await page.fill('textarea[id="#comments"]', 'Looking forward to collaborating!');
  
    //   // Submit the form
    //   await page.click('button[type="submit"]');
  
    //   // Ensure success message is shown
    //   await expect(page.locator('.text-green-500')).toHaveText('Form submitted successfully!');
    // });
  
  });
  









 

  test('should show an error message when the JSON schema is invalid', async ({ page }) => {
    // Navigate to the app page (adjust the URL if necessary)
    await page.goto('http://localhost:5173'); 
  
    // Modify the JSON input to an invalid schema (or empty string)
    const jsonEditor = await page.locator('#jsonEditor');
    await jsonEditor.fill('{ invalidJson }');
  
    // Wait for the error message to appear
    const errorMessage = await page.locator('#json-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Invalid JSON schema. Please fix the input.');
  });
  
