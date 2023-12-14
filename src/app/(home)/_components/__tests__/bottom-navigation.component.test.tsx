import { cleanup, render, screen, waitFor, } from "@testing-library/react";
import BottomNavigation, { Tab, TabScreen } from "../bottom-navigation.component";
import { Abc, Backpack, Cabin } from "@mui/icons-material";
import { faCamera, faComment, faHome, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import userEvent from "@testing-library/user-event";

describe("Tab Screen Component", () => {
    it("should show the screen when the hidden flag is false", () => {
        const content = "Test";
        render(<TabScreen hidden={false}>{content}</TabScreen>);

        const div = screen.getByText(content);
        expect(div).toBeVisible();
    });

    it("should hide the screen when the hidden flag is true", () => {
        const content = "Test";
        render(<TabScreen hidden={true}>{content}</TabScreen>);

        const div = screen.getByText(content);
        expect(div).not.toBeVisible();
    });
});

const tabs: Tab[] = [
    {
        tabLabel: "feed",
        tabValue: "feed",
        tabIcon: faHome,
        screen: <div>Home</div>,
        darkTheme: true,
    },
    {
        tabLabel: "explore",
        tabValue: "explore",
        tabIcon: faMagnifyingGlass,
        screen: <div>Explore</div>
    },
    {
        tabLabel: "create-post",
        tabValue: "create-post",
        tabIcon: faCamera,
        screen: <div>Post</div>,
        darkTheme: true,
    },
    {
        tabLabel: "chats",
        tabValue: "chats",
        tabIcon: faComment,
        screen: <div>Chats</div>,
    },
    {
        tabLabel: "me",
        tabValue: "me",
        tabIcon: faUser,
        screen: <div>Me</div>,
    }
];

describe("Bottom Navigation", () => {
    beforeAll(() => {
        render(<BottomNavigation tabs={tabs} />)
    });

    afterEach(() => {
        cleanup();
    });

    it("should display the screen when clicked on", async () => {
        for (const tab of tabs) {
            const { children } = (tab.screen as any).props;
            const tabScreen = screen.getByText(children);
            const bottomNavTab = screen.getByLabelText(tab.tabLabel || tab.tabValue);

            await userEvent.click(bottomNavTab);

            expect(tabScreen).toBeVisible();
        }
    });
});