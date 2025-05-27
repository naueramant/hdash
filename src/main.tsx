import { Box, CssVarsProvider, styled } from "@mui/joy";
import { StrictMode, type FunctionComponent } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.scss";
import useUserStore from "./stores/user.ts";
import theme from "./theme.ts";
import Overview from "./views/Overview/index.tsx";
import SubmitWeight from "./views/SubmitWeight/index.tsx";
import SelectUser from "./views/UserSelect/index.tsx";

const Main = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.neutral[800],
  color: theme.palette.text.primary,
}));

interface CurrentUserGuardProps {
  hasCurrentUser?: boolean;
  children?: React.ReactNode;
}

const CurrentUserGuard: FunctionComponent<CurrentUserGuardProps> = (props) => {
  const userStore = useUserStore();

  const allow = !!userStore.user === props.hasCurrentUser;

  return (
    <>
      {allow ? (
        props.children
      ) : (
        <Navigate to={props.hasCurrentUser ? "/" : "/overview"} replace />
      )}
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider theme={theme} defaultMode="dark" defaultColorScheme="dark">
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <CurrentUserGuard hasCurrentUser={false}>
                  <SelectUser />
                </CurrentUserGuard>
              }
            />

            <Route
              path="/overview"
              element={
                <CurrentUserGuard hasCurrentUser={true}>
                  <Overview />
                </CurrentUserGuard>
              }
            />
            <Route
              path="/submit-weight"
              element={
                <CurrentUserGuard hasCurrentUser={true}>
                  <SubmitWeight />
                </CurrentUserGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </Main>
    </CssVarsProvider>
  </StrictMode>
);

export default CurrentUserGuard;
