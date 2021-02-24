const path = require("path");
const playwright = require("playwright");

test("Selector [text=] bug", async () => {
  const browser = await playwright["chromium"].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`file:${path.join(__dirname, "test.html")}`);

  const nestedItemFindByText = await page.waitForSelector('text="Illon M."', {
    timeout: 1_000,
  });

  console.log(await nestedItemFindByText.innerHTML());
});

afterEach(async () => {
  await context.close();
  await browser.close();
});
