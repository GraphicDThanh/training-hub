import { render } from "@testing-library/react";

// Components
import ProjectWrapper from "./ProjectWrapper";

describe("ProjectWrapper", () => {
  const renderComponent = () => {
    return render(
      <ProjectWrapper>
        <div>Test Project Wrapper</div>
      </ProjectWrapper>,
    );
  };

  it("match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
