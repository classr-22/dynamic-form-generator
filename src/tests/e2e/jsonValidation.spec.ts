import { test, expect } from '@playwright/test';

test('displays error for invalid JSON schema', async ({ page }) => {
    await page.goto('http://localhost:5173');
  
    const invalidSchema = '{"formTitle": "Test Form", "fields": [{"id": "name", "type": "text"}]}'; // Invalid schema
    await page.locator('#jsonEditor').fill(invalidSchema);
  
   
    await page.locator('button[type="submit"]').click();
  
    
  });
  




  test.describe('Form Generator Real-time Tests', () => {
    
    test.beforeEach(async ({ page }) => {
 
      await page.goto('http://localhost:5173');
    });
  
    test('should render the form preview based on JSON input', async ({ page }) => {
    
      await expect(page.locator('h1.text-3xl')).toHaveText('Project Requirements Survey');
      
   
      await expect(page.locator('input#name')).toBeVisible();
      await expect(page.locator('label[for="name"]')).toHaveText('Full Name *');
    });
  
    test('should display error for required fields if left empty', async ({ page }) => {
      
        await page.locator('button[type="submit"]').click();
      
        
        await expect(page.locator('p.text-red-500').first()).toHaveText('Full Name is required.');
        await expect(page.locator('p.text-red-500').nth(1)).toHaveText('Please enter a valid email address');
        await expect(page.locator('p.text-red-500').nth(2)).toHaveText('Company Size is required.');
        await expect(page.locator('p.text-red-500').nth(3)).toHaveText('Industry is required.');
        await expect(page.locator('p.text-red-500').nth(4)).toHaveText('Project Timeline is required.');
      });
      
  
    
  
    test('should submit the form with valid data', async ({ page }) => {
      
      await page.fill('input#name', 'John Doe');
      await page.fill('input#email', 'john.doe@example.com');
      await page.selectOption('select#companySize', { label: '51-200 employees' });
      await page.click('input#industry-tech'); // Select the "Technology" radio button
      await page.selectOption('select#timeline', { label: 'Immediate (within 1 month)' });
      await page.fill('textarea#comments', 'Looking forward to the project.');
  
     
      await page.locator('button[type="submit"]').click();
  
     
      await expect(page.locator('p.text-green-500')).toHaveText('Form submitted successfully!');
    });
  
    test('should update form data in real-time when JSON is changed', async ({ page }) => {
      
      await expect(page.locator('input#name')).toHaveValue('');
      
    
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
  
   
      await page.fill('textarea#jsonEditor', newJsonInput);
  
 
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
  
     
      await page.fill('textarea#jsonEditor', invalidJson);
  
  
      await expect(page.locator('#json-error')).toBeVisible();
      await expect(page.locator('#json-error')).toHaveText('Invalid JSON schema. Please fix the input.');
    });
  });
  




  test.describe('Form Validation and Submission', () => {
  
   
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173'); // Change this if your app runs on a different URL
    });
  
  
  });
  









 

  test('should show an error message when the JSON schema is invalid', async ({ page }) => {
    
    await page.goto('http://localhost:5173'); 
  
  
    const jsonEditor = await page.locator('#jsonEditor');
    await jsonEditor.fill('{ invalidJson }');
  
    
    const errorMessage = await page.locator('#json-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Invalid JSON schema. Please fix the input.');
  });
  
