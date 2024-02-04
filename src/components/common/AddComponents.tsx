import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import useSWR, { mutate } from "swr";
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3030/users");
  return response.data.data;
};
const fetchOrganizations = async () => {
  const response = await axios.get("http://localhost:3030/organizations");
  return response.data.data;
};
const fetchDevices = async () => {
  const response = await axios.get("http://localhost:3030/devices");
  return response.data.data;
};
const AddComponents = ({ show, onClose, type }: any) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const { data: users, mutate: mutateUsers } = useSWR("users", fetchUsers);
  const { data: organizations, mutate: mutateOrganizations } = useSWR(
    "organizations",
    fetchOrganizations
  );
  const { data: devices, mutate: mutateDevices } = useSWR(
    "devices",
    fetchDevices
  );
  const handleAdd = () => {
    if (type === "user") {
      const ageValue = isNaN(parseInt(age, 10)) ? age : parseInt(age, 10);
      const phoneValue = isNaN(parseInt(phone, 10))
        ? phone
        : parseInt(phone, 10);
      axios
        .post(`http://localhost:3030/user/register`, {
          lastName: lastName,
          firstName: firstName,
          age: ageValue,
          phone: phoneValue,
          gender: gender,
          email: email,
          password: password,
        })
        .then((response) => {
          toast.success("Хэрэглэгчийн мэдээлэл амжилттай нэмэгдлээ");
          mutateUsers(response.data.data, false);
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа");
          console.log(error);
        });
    } else if (type === "organization") {
      const phoneValue = isNaN(parseInt(phone, 10))
        ? phone
        : parseInt(phone, 10);
      axios
        .post(`http://localhost:3030/organizations`, {
          orgName: lastName,
          orgRegister: firstName,
          phone: phoneValue,
        })
        .then((response) => {
          toast.success("Байгууллагын мэдээлэл амжилттай нэмэгдлээ");
          mutateOrganizations(response.data.data, false);
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Байгууллагын мэдээлэл нэмэхэд алдаа гарлаа");
          console.log(error);
        });
    } else if (type === "device") {
      const ageValue = isNaN(parseInt(age, 10)) ? age : parseInt(age, 10);
      axios
        .post(`http://localhost:3030/devices`, {
          deviceName: lastName,
          deviceNo: firstName,
          deviceTspe: email,
          devicePrice: ageValue,
        })
        .then((response) => {
          toast.success("Төхөөрөмжийн мэдээлэл амжилттай нэмэгдлээ");
          mutateDevices(response.data.data, false);
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Төхөөрөмжийн мэдээллийг шинэчлэхэд алдаа гарлаа");
          console.log(error);
        });
    }
  };
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 mt-20"
        onClose={() => onClose()}
      >
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-[#070a18] p-6 text-left align-middle shadow-xl transition-all">
                <Toaster richColors position="top-center" />
                <div className="flex">
                  <div className="flex flex-col gap-5 w-full">
                    {type === "user" && (
                      <>
                        <input
                          placeholder="Овог"
                          value={lastName}
                          type="text"
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Нэр"
                          value={firstName}
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Нас"
                          value={age}
                          type="number"
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Утасны дугаар"
                          value={phone}
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="И-мэйл хаяг"
                          value={email}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <select
                          value={gender}
                          onChange={(event) => setGender(event.target.value)}
                          className="bg-transparent text-white p-3 w-full sm:w-1/2 text-base font-normal rounded border-2 border-solid border-[#1E2339]"
                        >
                          <option value="">Хүйс сонгоно уу?</option>
                          <option value="male">Эр</option>
                          <option value="female">Эм</option>
                          <option value="other">Бусад</option>
                        </select>

                        <input
                          placeholder="Нууц үг"
                          value={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                      </>
                    )}

                    {type === "organization" && (
                      <>
                        <input
                          placeholder="Байгууллагын нэр"
                          value={lastName}
                          type="text"
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Байгууллагын дугаар"
                          value={firstName}
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Утасны дугаар"
                          value={phone}
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                      </>
                    )}
                    {type === "device" && (
                      <>
                        <input
                          placeholder="Төхөөрөмжийн нэр"
                          value={lastName}
                          type="text"
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Төхөөрөмжийн дугаар"
                          value={firstName}
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Төхөөрөмжийн төрөл"
                          value={email}
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          placeholder="Төхөөрөмжийн үнэ"
                          value={age}
                          type="number"
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full sm:w-1/2 p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                      </>
                    )}
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border-2 border-solid border-[#82ff1b] bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-3"
                        onClick={handleAdd}
                      >
                        Хадгалах
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border-2 border-solid border-[#1e2339] bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onClose()}
                    >
                      Хаах
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddComponents;
