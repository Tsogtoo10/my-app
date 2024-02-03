import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import LayoutContainer from "@/layout/containers/LayoutContainer";
import LoginLayoutContainer from "@/layout/containers/LoginLayoutContainer";

type Props = {
  pageProps: any;
  Component: any;
};

export default function App({ Component, pageProps }: Props) {
  const router = useRouter();
  const adminPaths = ["/login"];
  const path = router.pathname;
  const isPathAdmin = adminPaths.includes(path);
  const LayoutComponent = isPathAdmin ? LoginLayoutContainer : LayoutContainer;

  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
