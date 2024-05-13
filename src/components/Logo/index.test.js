import {render, screen} from "@testing-library/react";
import Logo from ".";

describe("Logo component", () => {
    describe("when a logo is created with the size small default attribute", () => {
        it("shoul be render into the webpage", () => {
            render(<Logo />) ;
            expect(screen.getByTestId("logo")).toBeInTheDocument();
        }) 
    })
    describe("when a logo is created with the size large attribute", () => {
        it("shoul be render into the webpage", () => {
            render(<Logo size="large" />) ;
            expect(screen.getByTestId("logo")).toBeInTheDocument();
        }) 
    })
    
}) 