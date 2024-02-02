import LoginLayout from "../components/LoginLayout";
type Props = {
  children: any;
};
const LoginLayoutContainer = (props: Props) => {
  return <LoginLayout {...props} />;
};
export default LoginLayoutContainer;
