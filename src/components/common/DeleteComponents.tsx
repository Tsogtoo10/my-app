import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
const DeleteComponents = ({ show, onClose, deleteData, type }: any) => {
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (type === "user") {
      axios
        .delete(`http://localhost:3030/user/${deleteData.id}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("Хэрэглэгчийг амжилттай устгалаа");
          onClose();
        })
        .catch((error) => {
          toast.error("Хэрэглэгчийг устгахад алдаа гарлаа!!!");
        });
    } else if (type === "organization") {
      axios
        .delete(`http://localhost:3030/organizations/${deleteData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("Байгууллагыг амжилттай устгалаа");
          onClose();
        })
        .catch((error) => {
          toast.error("Байгууллагыг устгахад алдаа гарлаа!!!");
        });
    } else if (type === "device") {
      axios
        .delete(`http://localhost:3030/devices/${deleteData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("Төхөөрөмжийг амжилттай устгалаа");
          onClose();
        })
        .catch((error) => {
          toast.error("Төхөөрөмжийг устгахад алдаа гарлаа!!!");
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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-[#070a18] p-3">
                <Toaster richColors position="top-center" />
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
                        onClick={handleDelete}
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
