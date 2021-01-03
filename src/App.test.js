import { render, screen } from "@testing-library/react";
import App from "./App";

describe("text renders", () => {
  test("renders static text", () => {
    render(<App />);
    const bannerTitle = screen.getByText(/Report Vaccini Anti COVID-19/i);
    const timestampText = screen.getByText(/Dati aggiornati al/i);
    const totText = screen.getByText(/Totale vaccinazioni/i);
    
    expect(bannerTitle).toBeInTheDocument();
    expect(timestampText).toBeInTheDocument();
    expect(totText).toBeInTheDocument();
  });
});
