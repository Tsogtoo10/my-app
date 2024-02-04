type Props = {
  children: any;
};
const LoginLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-auto flex items-start justify-start relative">
        <main className="w-full max-h-[80vh] overflow-y-auto">{children}</main>
      </div>
    </>
  );
};
export default LoginLayout;
