import { render } from '@testing-library/react';
import TalkWithPolyGlot, { TalkWithPolyGlotProps } from './talkWithPolyglot'; // Assuming TalkWithPolyGlotProps is the type for TalkWithPolyGlot props


test('TalkWithPolyGlot', () => {
  it('renders Sidebar component conditionally based on showMobileSideBar prop', () => {

    const mockSetShowMobileSideBar = jest.fn()
    // When showMobileSideBar is false
    const { queryByTestId: queryByTestIdFalse } = render(<TalkWithPolyGlot showMobileSideBar={false} />);
    const sidebarWhenNotVisible = queryByTestIdFalse('sidebar-component');
    expect(sidebarWhenNotVisible).toBeNull(); // Sidebar shouldn't be rendered

    // When showMobileSideBar is true
    const { queryByTestId:  queryByTestIdTrue} = render(<TalkWithPolyGlot showMobileSideBar={true} />);
    const sidebarWhenVisible = queryByTestIdTrue('sidebar-component');
    expect(sidebarWhenVisible).toBeInTheDocument(); // Sidebar should be rendered
  });
});