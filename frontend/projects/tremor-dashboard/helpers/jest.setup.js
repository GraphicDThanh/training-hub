jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (...props) => {
    const dynamicModule = jest.requireActual("next/dynamic");
    const dynamicActualComp = dynamicModule.default;
    const RequiredComponent = dynamicActualComp(props[0]);
    RequiredComponent.preload
      ? RequiredComponent.preload()
      : RequiredComponent.render.preload();
    return RequiredComponent;
  },
}));

jest.mock("next/navigation", () => {
  const actual = jest.mock("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({ get: jest.fn(() => "mockPage") })),
    usePathname: jest.fn(),
  };
});

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));
