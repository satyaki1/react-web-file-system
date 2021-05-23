import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App/>", () => {
  test("renders root option", () => {
    render(<App />);
    const rootElement = screen.getByText(/root/i);
    expect(rootElement).toBeInTheDocument();
  });

  test("renders search bar", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId(/searchbar/g)).toBeTruthy();
  });

  test("renders navigation", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId(/navigation/g)).toBeTruthy();
  });

  test("renders add new file or folder component", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId(/add-new/g)).toBeTruthy();
  });
});
