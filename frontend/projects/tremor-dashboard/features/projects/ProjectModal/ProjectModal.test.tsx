import { render } from "@testing-library/react";

// Constants
import { PARTICIPANTS_PROJECTS, TOOL_ICON_OPTION } from "@/constants/projects";

// Components
import ProjectModal from "./ProjectModal";
import { PROJECT_DATA } from "@/mocks";

describe("Testing ProjectModal component", () => {
  const mockHandleToggleModal = jest.fn();
  const setupRender = () => {
    return render(
      <ProjectModal
        onClose={mockHandleToggleModal}
        projectData={PROJECT_DATA[0]}
        userId={0}
        projectTools={TOOL_ICON_OPTION}
        participantsData={PARTICIPANTS_PROJECTS}
      />,
    );
  };

  it.skip("Should match snapshot", () => {
    const { container } = setupRender();
    expect(container).toMatchSnapshot();
  });
});
