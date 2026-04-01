/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";

// ---- MOCK THEME CONTEXT ----
jest.mock("./context/ThemeContext", () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>,
  useTheme: () => ({ theme: "dark", setTheme: jest.fn() }),
}));

// ---- MOCK PAGES ----
jest.mock("./pages/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Layout", () => {
  const { Outlet } = require("react-router-dom");
  return () => (
    <div>
      <div>Layout Page</div>
      <Outlet />
    </div>
  );
});
jest.mock("./pages/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("./pages/WriteArticle", () => () => <div>Write Article Page</div>);
jest.mock("./pages/BlogTitles", () => () => <div>Blog Titles Page</div>);
jest.mock("./pages/GenerateImages", () => () => <div>Generate Images Page</div>);
jest.mock("./pages/RemoveBackground", () => () => <div>Remove Background Page</div>);
jest.mock("./pages/RemoveObject", () => () => <div>Remove Object Page</div>);
jest.mock("./pages/ReviewResume", () => () => <div>Review Resume Page</div>);
jest.mock("./pages/Community", () => () => <div>Community Page</div>);
jest.mock("./pages/ManagePlan", () => () => <div>Manage Plan Page</div>);

// ---- MOCK CLERK ----
jest.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({ isSignedIn: false, getToken: jest.fn() }),
}));

describe("App Routing", () => {
  test("renders Home page on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Dashboard page on /ai", () => {
    render(
      <MemoryRouter initialEntries={["/ai"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Layout Page")).toBeInTheDocument();
  });

  test("renders Write Article page", () => {
    render(
      <MemoryRouter initialEntries={["/ai/write-article"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Write Article Page")).toBeInTheDocument();
  });

  test("renders Blog Titles page", () => {
    render(
      <MemoryRouter initialEntries={["/ai/blog-titles"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Blog Titles Page")).toBeInTheDocument();
  });

  test("renders Generate Images page", () => {
    render(
      <MemoryRouter initialEntries={["/ai/generate-images"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Generate Images Page")).toBeInTheDocument();
  });

  test("renders Community page", () => {
    render(
      <MemoryRouter initialEntries={["/ai/community"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Community Page")).toBeInTheDocument();
  });

  test("renders Manage Plan page", () => {
    render(
      <MemoryRouter initialEntries={["/ai/manage-plan"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Manage Plan Page")).toBeInTheDocument();
  });
});
