// ProjectInfoCard.test.tsx
import { render } from "@testing-library/react";

// Components
import ProjectInfoCard from "./ProjectInfoCard";

// Mocks
import { PROJECT_DATA } from "@/mocks";

const ProjectInfoCardProps = {
  projects: PROJECT_DATA,
};

const ProjectInfoCardComponent = () =>
  render(<ProjectInfoCard {...ProjectInfoCardProps} />);

describe("ProjectInfoCard Component", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("render ProjectInfoCard component with snapshot correctly", () => {
    const { container } = ProjectInfoCardComponent();

    expect(container).toMatchSnapshot();
  });

  it("renders ProjectInfoCard component with mock data", () => {
    const { getByText } = ProjectInfoCardComponent();

    const projectNames = PROJECT_DATA.map(({ name }) => getByText(name));
    expect(projectNames.length).toBe(PROJECT_DATA.length);
  });
});
