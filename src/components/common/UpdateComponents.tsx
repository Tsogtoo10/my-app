import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
const UpdateComponents = ({ show, onClose }: any) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-[#070a18] p-3">
                <div className="flex">
                  <div className="flex flex-col gap-5 w-full">
                    <>
                      <input
                        type="text"
                        value={lastName}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Овог"
                        className="w-full  p-3 text-base font-normal bg-transparent"
                      />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Нэр"
                        className="w-full  p-3 text-base font-normal bg-transparent"
                      />
                      <input
                        type="email"
                        value={email}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="И-мэйл хаяг"
                        className="w-full p-3 text-base font-normal bg-transparent"
                      />
                      <input
                        type="number"
                        value={phone}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Утасны дугаар"
                        className="w-full  p-3 text-base font-normal bg-transparent"
                      />
                    </>
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="inline-flex justify-center rounded-md border-2 border-solid border-green-200 text-white px-3 py-1"
                    >
                      Хадгалах
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
