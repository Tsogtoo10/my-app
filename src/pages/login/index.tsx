import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`http://localhost:3030/user/12/login`, user)
      .then((response) => {
        console.log(response, "response");
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Амжилттай нэвтэрлээ");
        setEmail("");
        setPassword("");
        router.push("/");
      })
      .catch((error) => {
        console.log("error", error);
        toast.warning("Нэвтрэхэд алдаа гарлаа");
      });
  };
  return (
    <div className="pt-12 pb-12 ">
      <h1 className="text-black text-center text-4xl font-extrabold pb-10">
        Нэвтрэх хэсэг
      </h1>
      <div className="flex justify-center">
        <div className="bg-white flex flex-col xl:flex-row lg:flex-row justify-center gap-5 w-full xl:w-1/2 lg:w-1/2 rounded-lg p-10">
          <div className="flex flex-col gap-6 w-full xl:w-1/2 ">
            <input
              placeholder="И-мэйл хаяг"
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full text-base font-normal bg-white rounded p-3 text-[#212529] border border-solid border-[#ced4da]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Нууц үг"
              security="true"
              type="password"
              className="w-full text-base font-normal bg-white rounded p-3 text-[#212529] border border-solid border-[#ced4da]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <div>
              <Toaster richColors position="top-center" />
              <button
                onClick={handleLogin}
                type="submit"
                className="bg-gradient-to-br from-pink-600 to-purple-900 w-full rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Нэвтрэх
              </button>
            </div>
          </div>
          <div className="w-full xl:w-1/2">
            <Image
              src="/logo.jpg"
              alt=""
              className="w-full"
              width={300}
              height={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
