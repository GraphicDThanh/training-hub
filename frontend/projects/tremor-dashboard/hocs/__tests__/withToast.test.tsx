import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { TOAST_TYPE, TWithToast, withToast } from "../withToast";

const Component = ({ openToast }: TWithToast<{}>) => {
  const handleOpenToast = () => {
    openToast(
      { message: "Test Success", type: TOAST_TYPE.SUCCESS },
      mockCallback,
    );
  };

  return (
    <div>
      Test withToast
      <button onClick={handleOpenToast}>Open Toast</button>
    </div>
  );
};

const setup = (isLoading: boolean = false) => {
  const ComponentWithToast = withToast(Component, isLoading);
  return render(<ComponentWithToast />);
};

let mockCallback: jest.Mock;

beforeEach(() => {
  mockCallback = jest.fn();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

describe("withToast tests", () => {
  it("Should show Toast correctly when click button Open Toast", async () => {
    const { getByText, queryByTestId } = setup();

    const button = getByText("Open Toast");
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByTestId("toast")).toBeTruthy();
      expect(getByText("Test Success")).toBeTruthy();
    });
  });

  it("Should show Toast when click button Open Toast and hidden after 3s", async () => {
    const { getByText, queryByTestId } = setup();

    const button = getByText("Open Toast");
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByTestId("toast")).toBeTruthy();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(queryByTestId("toast")).toBeFalsy();
  });

  it("'mockCallback' triggered when click button Open Toast after 3s", async () => {
    const { getByText } = setup();

    const button = getByText("Open Toast");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockCallback).not.toHaveBeenCalled();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it("Should show loading when 'isLoading = true' and click button Open Toast and hidden after 3s", async () => {
    const { getByText, queryByTestId } = setup(true);

    const button = getByText("Open Toast");
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByTestId("loading-page")).toBeTruthy();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(queryByTestId("loading-page")).toBeFalsy();
  });
});
