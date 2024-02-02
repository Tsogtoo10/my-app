// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LayoutContainer from "@/layout/containers/LayoutContainer";
import LoginLayoutContainer from "@/layout/containers/LoginLayoutContainer";

type Props = {
  pageProps: any;
  Component: any;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || getDefaultLayout;

  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  );

  function getDefaultLayout(page: any) {
    if (page.pathname === "/login") {
      return <LoginLayoutContainer>{page}</LoginLayoutContainer>;
    }

    return <LayoutContainer>{page}</LayoutContainer>;
  }
}
