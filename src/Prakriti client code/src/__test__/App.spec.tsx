import { render } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders App component with loading state", () => {
    render(<App />);
  });
});
