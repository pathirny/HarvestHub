import { test, expect } from "@playwright/test";

test("has title", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Harvest hub!/);
});

test("clicking sign in link takes you to log in page", async ({
  page,
}: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/");

  // Click the Sign In link.
  await page.getByRole("link", { name: "Sign In" }).click();

  // Expects page to have a button with the name of Sign In.
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  // Expects page to have a button with the name of Sign Up.
  await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  // Expects page to have a button with the name of Forgot your password?.
  await expect(
    page.getByRole("link", { name: "Forgot your password?" })
  ).toBeVisible();
  // Expects page to have a button with the name of Continue as Guest
  await expect(
    page.getByRole("button", { name: "Continue as Guest" })
  ).toBeVisible();

  // Expect the input fields to be visible and empty.
  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByPlaceholder("Email")).toHaveValue("");
  await expect(page.getByPlaceholder("Password")).toHaveValue("");
});

test("login", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  // Expect to see the users icon.
  await expect(
    page.getByRole("link", { name: "the Users profile" })
  ).toBeVisible({ timeout: 10000 });
  // Click the users icon.
  await page.getByRole("link", { name: "the Users profile" }).click();
  // Expect to see the user's name.
  await expect(page.getByText("Testy")).toBeVisible();
});

test("navigate to tips and tricks", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  // Expect to see tips and tricks link.
  await expect(
    page.getByRole("link", { name: "Tips and Tricks" })
  ).toBeVisible();
  // Click the tips and tricks link.
  await page.getByRole("link", { name: "Tips and Tricks" }).click();
  // Expect the heading to say Tips and Tricks.
  await expect(
    page.getByRole("heading", { name: "Tips and Tricks" })
  ).toBeVisible();
});

test("add a tip to tips and tricks", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  // Click the tips and tricks link.
  await page.getByRole("link", { name: "Tips and Tricks" }).click();
  // Click the add tip button.
  await page.getByRole("button", { name: "Add Tip" }).click();
  // Expect the input fields to be visible and empty.
  await expect(page.getByPlaceholder("Title")).toBeVisible();
  await expect(page.getByPlaceholder("Description")).toBeVisible();
  await expect(page.getByPlaceholder("Title")).toHaveValue("");
  await expect(page.getByPlaceholder("Description")).toHaveValue("");
  // Enter the title and description.
  await page.getByPlaceholder("Title").fill("Test Tip");
  await page.getByPlaceholder("Description").fill("Test Description");
  // Click the submit button.
  await page.getByRole("button", { name: "Submit" }).click();
  // Expect the tip to be visible.
  await expect(page.getByText("Test Tip").first()).toBeVisible({
    timeout: 10000,
  });
});

test("delete tip from tips and tricks", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  // Expect to see the users icon.
  await expect(
    page.getByRole("link", { name: "the Users profile" })
  ).toBeVisible({ timeout: 10000 });
  // Click the users icon.
  await page.getByRole("link", { name: "the Users profile" }).click();
  // Click the your tips link.
  await page.getByRole("link", { name: "Your Tips" }).click();
  // Expect the tip to be visible.
  await expect(page.getByText("Test Tip").first()).toBeVisible({
    timeout: 20000,
  });
  // Click the delete button.
  await page.getByLabel('Add to favourites').first().click();
  // Expect the tip to be gone.
  await expect(page.getByText("Test Tip").first()).not.toBeVisible();
});

test("checking that months are visable in the Growing Calendar", async ({
  page,
}: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  // Expect to see the Growing Calendar link on the home page.
  await page.getByRole("link", { name: "Growing Calendar" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Calendar",
    })
  .first()).toBeVisible({ timeout: 20000 });
  await page.getByRole("link", { name: "January month" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Month",
    })
  ).toBeVisible();
});

test("checking that individual veggie page opens and retrieves data from database", async ({
  page,
}: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.goto("https://harvest-hub-tau.vercel.app/calendar/0");
  await expect(page.getByRole("link", { name: "Orange" })).toBeVisible({
    timeout: 20000,
  });
  await expect(page.getByRole("link", { name: "Cauliflower" })).toBeVisible({
    timeout: 20000,
  });
  await expect(page.getByRole("link", { name: "Grapefruit" })).toBeVisible({
    timeout: 20000,
  });

  await page.getByRole("link", { name: "Cauliflower" }).click();
  await expect(
    page.getByRole("heading", { name: "Cauliflower" })
  ).toBeVisible();
});

test("testing getting onto the growing calendar", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  // Enter the email and password.
  await page.getByPlaceholder("Email").fill("testington706@gmail.com");
  await page.getByPlaceholder("Password").fill("testpassword");

  // Click the Sign In link.
  await page.getByRole("button", { name: "Sign In" }).click();

  //going to calendar
  await page.getByRole("link", { name: "My Garden Calendar" }).click();

  //should see my garden calendar
  await expect(page.getByRole("heading", { name: "My Garden" })).toBeVisible();

  //clicking arrow btn
  await page.getByTitle("Previous month").click();

  //checking month has changed
  await expect(page.getByRole("heading", { name: "Dec" })).toBeVisible();
});

test("checking conitue as guest works and that add tip isn't there when not signed in", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  //clicking continue as guest
  await page.getByRole("button", { name: "Continue as Guest" }).click();
  // find the tips and tricks link
  await page.getByRole("link", { name: "Tips and Tricks" }).click();
  // expect the add tip button to not be visible
  await expect(page.getByRole("button", { name: "Add Tip" })).not.toBeVisible();
});

test("checking conitue as guest works and a popup stops access", async ({ page }: any) => {
  await page.goto("https://harvest-hub-tau.vercel.app/login");

  //clicking continue as guest
  await page.getByRole("button", { name: "Continue as Guest" }).click();
  // find the my garden link
  await page.getByRole("link", { name: "My Garden" }).click();
  // expect a popup to appear
  await expect(page.getByRole("button", { name: "Click to log in  or sign up" })).toBeVisible();
});
