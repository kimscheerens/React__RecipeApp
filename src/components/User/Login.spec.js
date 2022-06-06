import App from "./App";

describe("attributes", () => {
  it("uses the right homepage", () => {
    const app = new App();
    expect(app.homepage).toEqual("hier komt dan de upgeloade website");
  });

  it("gets the right context colour to start", () => {
    const app = new App();
    expect(app.colorScheme()).toEqual("lightTheme");
  });
});
