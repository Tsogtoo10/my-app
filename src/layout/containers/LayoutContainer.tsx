import Layout from "../components/Layout";
type Props = {
  children: any;
};
const LayoutContainer = (props: Props) => {
  return <Layout {...props} />;
};
export default LayoutContainer;
