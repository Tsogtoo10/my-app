import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
const DeleteComponents = ({ show, onClose }: any) => {
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
                    <h1 className="text-white">
                      Та устгахдаа итгэлтэй байна уу?
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="inline-flex justify-center rounded-md border-2 border-solid border-red-200 text-white px-3 py-1"
                      >
                        Үгүй
                      </button>
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="inline-flex justify-center rounded-md border-2 border-solid border-green-200 text-white px-3 py-1"
                      >
                        Тийм
                      </button>
                    </div>
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
export default DeleteComponents;
