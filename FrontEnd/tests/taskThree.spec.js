// Ni ska skriva följande tre GUI-tester med Playwright:
// x Lägg till en anteckning och bekräfta att den visas på sidan.
// * Lägg till en anteckning och bekräfta att sidan visar "1 item left". Kryssa sedan i anteckningen och bekräfta att sidan visar "0 items left".
// * Lägg till 3 anteckningar, kryssa i en av dem och bekräfta att sidan visar "2 items left".

// @ts-check
const { test, expect } = require('@playwright/test');

const new_Todos = [
  'Ett',
  'Två',
  'Tre'
];

test('add a task to the page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // create a new todo locator
  const addTodo = page.getByPlaceholder('What needs to be done?');

  await addTodo.fill(new_Todos[0]);

  await addTodo.press('Enter');

  await expect(new_Todos[0]).toEqual('Ett');
});

test('vertify the page update items left counter', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let tracker = await page.locator('#amount');
  const addTodo = page.getByPlaceholder('What needs to be done?');

  // Create one items.
  await addTodo.fill(new_Todos[0]);
  await addTodo.press('Enter');

  let trackerText = await tracker.textContent();
  // Assert completed class.
  await expect(trackerText).toEqual('1 items left');

  // Check first item.
  const todoFirst = page.locator('.user-task').nth(0);
  await todoFirst.getByRole('checkbox').check();

  trackerText = await tracker.textContent();
  // Assert completed class.
  await expect(trackerText).toEqual('0 items left');
});

test('verify the remaining tasks count after completing a task', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let tracker = await page.locator('#amount');
  const addTodo = page.getByPlaceholder('What needs to be done?');


  // Add 3 tasks
  await addTodo.fill(new_Todos[0]);
  await addTodo.press('Enter');
  await addTodo.fill(new_Todos[1]);
  await addTodo.press('Enter');
  await addTodo.fill(new_Todos[2]);
  await addTodo.press('Enter');

  // Check the checkbox of the second task
  const todoFirst = page.locator('.user-task').nth(0);
  await todoFirst.getByRole('checkbox').check();

  // Verify that the amount left is 2
  const amountLeft = await page.textContent('#amount');
  expect(amountLeft).toBe('2 items left');
});


