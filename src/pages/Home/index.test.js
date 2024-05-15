import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);

    setTimeout(async () => {
        const list = await screen.findByTestId("realisations-testid");
        const cards = await within(list).findAllByTestId("card-testid");
        expect(cards.length).toBeGreaterThan(3);
    }, 2000);
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const list = screen.getByTestId("listcontainer-testid") ;
    const items = within(list).getAllByTestId("peoplecard-testid");
    expect(items.length).toBeGreaterThan(3);
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = screen.getByRole("contentinfo");   
    expect(footer).toBeInTheDocument();    
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
    
  })
});
