import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const UpdateComponents = ({ show, onClose, updateData, type }: any) => {
  const [lastName, setLastName] = useState(updateData?.lastName || "");
  const [firstName, setFirstName] = useState(updateData?.firstName || "");
  const [age, setAge] = useState(updateData?.age || "");
  const [phone, setPhone] = useState(updateData?.phone || "");
  const [email, setEmail] = useState(updateData?.email || "");
  const [password, setPassword] = useState(updateData?.password || "");
  const [gender, setGender] = useState(updateData?.gender || "");
  useEffect(() => {
    if (type === "user") {
      setLastName(updateData?.lastName || "");
      setFirstName(updateData?.firstName || "");
      setAge(updateData?.age || "");
      setPhone(updateData?.phone || "");
      setEmail(updateData?.email || "");
      setPassword(updateData?.password || "");
      setGender(updateData?.gender || "");
    } else if (type === "organization") {
      setLastName(updateData?.orgName || "");
      setFirstName(updateData?.orgRegister || "");
      setPhone(updateData?.phone || "");
    } else if (type === "device") {
      setLastName(updateData?.deviceName || "");
      setFirstName(updateData?.deviceNo || "");
      setEmail(updateData?.deviceTspe || "");
      setAge(updateData?.devicePrice || "");
    }
  }, [updateData]);
  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (type === "user") {
      const ageValue = isNaN(parseInt(age, 10)) ? age : parseInt(age, 10);
      const phoneValue = isNaN(parseInt(phone, 10))
        ? phone
        : parseInt(phone, 10);
      axios
        .put(
          `http://localhost:3030/user/${updateData.id}/update`,
          {
            lastName: lastName,
            firstName: firstName,
            age: ageValue,
            phone: phoneValue,
            email: email,
            password: password,
            gender: gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          toast.success("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ");
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа");
        });
    } else if (type === "organization") {
      const phoneValue = isNaN(parseInt(phone, 10))
        ? phone
        : parseInt(phone, 10);
      axios
        .put(
          `http://localhost:3030/organizations/${updateData.id}`,
          {
            orgName: lastName,
            orgRegister: firstName,
            phone: phoneValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          toast.success("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ");
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа");
        });
    } else if (type === "device") {
      const ageValue = isNaN(parseInt(age, 10)) ? age : parseInt(age, 10);
      axios
        .put(
          `http://localhost:3030/devices/${updateData.id}`,
          {
            deviceName: lastName,
            deviceNo: firstName,
            deviceTspe: email,
            devicePrice: ageValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          toast.success("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ");
          setTimeout(() => {
            onClose();
          }, 3000);
        })
        .catch((error) => {
          toast.error("Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа");
        });
    }
  };
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50 mt-20" onClose={onClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"></div>
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
                          type="text"
                          value={lastName}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Овог"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Нэр"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          type="number"
                          value={age}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Нас"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          type="number"
                          value={phone}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Утасны дугаар"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          type="email"
                          value={email}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="И-мэйл хаяг"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <input
                          type="text"
                          value={password}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Нууц үг"
                          className="w-full sm:w-4/6  p-3 text-base text-white font-normal bg-transparent rounded placeholder:text-[#fff] border-2 border-solid border-[#1E2339]"
                        />
                        <select
                          value={gender}
                          onChange={(event) => setGender(event.target.value)}
                          className="bg-transparent text-white p-3 w-full sm:w-4/6 text-base font-normal rounded border-2 border-solid border-[#1E2339]"
                        >
                          <option value="male">Эр</option>
                          <option value="female">Эм</option>
                          <option value="other">Бусад</option>
                        </select>
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

                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="inline-flex justify-center sm:w-4/6  rounded-md border-2 border-solid border-green-200 text-white px-3 py-1"
                    >
                      Хадгалах
                    </button>
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
export default UpdateComponents;
