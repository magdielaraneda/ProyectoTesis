import { promises as fs } from "fs";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Pruebas de aceptación: Flujo de login con Chrome", () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test(
    "Debería iniciar sesión y mostrar el mensaje de bienvenida",
    async () => {
      try {
        await driver.get("http://localhost:3000/login");

        // Captura de pantalla para depuración
        const screenshot = await driver.takeScreenshot();
        await fs.writeFile("screenshot.png", screenshot, "base64");

        // Aumenta el tiempo de espera para el campo de email
        await driver.wait(until.elementLocated(By.name("email")), 20000);

        // Interactúa con los campos
        await driver.findElement(By.name("email")).sendKeys("admin@email.com");
        await driver.findElement(By.name("password")).sendKeys("admin123");

        // Haz clic en el botón de login
        await driver.findElement(By.id("login-button")).click();

        // Espera al mensaje de bienvenida
        const welcomeMessage = await driver
          .wait(until.elementLocated(By.id("welcome-message")), 20000)
          .getText();

        // Verifica el mensaje de bienvenida
        expect(welcomeMessage).toContain("Bienvenido");
      } catch (err) {
        console.error("Error en la prueba de login:", err.message);
        throw err;
      }
    },
    30000 // Timeout específico para esta prueba
  );
});
