import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import BankCounter from "../src/app/bank-counter/page";
import { act } from "react";

describe("Home", () => {
  it("renders the BankCounterPage", () => {
    const { unmount } = render(<BankCounter />);
    const divContainer = screen.getByTestId("container");
    expect(divContainer).toBeInTheDocument();
    unmount();
  });

  it("updates the queue number upon clicking of next button", async () => {
    const { unmount } = render(<BankCounter />);

    const nextButton = screen.getByTestId("next-button");
    const initialQueueNumber = Number(screen.getByTestId("queue").innerHTML);
    await act(() => nextButton.click());
    await waitFor(() => {
      const newQueueNumber = Number(screen.getByTestId("queue").innerHTML);
      expect(newQueueNumber).toBeLessThan(initialQueueNumber);
    });
    unmount();
  });

  it("updates the processing status of each counter upon first click of next button", async () => {
    const { unmount } = render(<BankCounter />);

    const nextButton = screen.getByTestId("next-button");
    await act(() => nextButton.click());
    await waitFor(() => {
      const counter0NewStatus = screen.getByTestId(
        "processing-counter-0"
      ).innerHTML;

      const counter1NewStatus = screen.getByTestId(
        "processing-counter-1"
      ).innerHTML;

      const counter2NewStatus = screen.getByTestId(
        "processing-counter-2"
      ).innerHTML;

      const counter3NewStatus = screen.getByTestId(
        "processing-counter-3"
      ).innerHTML;

      expect(counter0NewStatus).toBe("processing");
      expect(counter1NewStatus).toBe("processing");
      expect(counter2NewStatus).toBe("processing");
      expect(counter3NewStatus).toBe("processing");
    });
    unmount();
  });

  it("updates the amount of processed clients after first click of next button", async () => {
    const { unmount } = render(<BankCounter />);

    const nextButton = screen.getByTestId("next-button");
    await act(() => nextButton.click());
    await waitFor(
      () => {
        const counter0ProcessedClients = Number(
          screen.getByTestId("processed-counter-0").innerHTML
        );

        const counter1ProcessedClients = Number(
          screen.getByTestId("processed-counter-1").innerHTML
        );

        const counter2ProcessedClients = Number(
          screen.getByTestId("processed-counter-2").innerHTML
        );

        const counter3ProcessedClients = Number(
          screen.getByTestId("processed-counter-3").innerHTML
        );

        expect(counter0ProcessedClients).toBe(2);
        expect(counter1ProcessedClients).toBe(1);
        expect(counter2ProcessedClients).toBe(1);
        expect(counter3ProcessedClients).toBe(1);
      },
      { timeout: 6000 }
    );
    unmount();
  });
});
