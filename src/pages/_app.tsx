import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LayoutContainer from "@/layout/containers/LayoutContainer";

type Props = {
  pageProps: any;
  Component: any;
};
export default function App({ Component, pageProps }: Props) {
  const getLayout =
    Component.getLayout ||
    ((page: any) => <LayoutContainer>{page}</LayoutContainer>);
  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  );
}
