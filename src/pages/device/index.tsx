import Title from "@/components/common/Title";
import Filter from "@/components/common/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteComponents from "@/components/common/DeleteComponents";
import UpdateComponents from "@/components/common/UpdateComponents";
import AddComponents from "@/components/common/AddComponents";
import { useState, useEffect } from "react";
import FilterButton from "@/components/common/FilterButton";
import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";
import ActionButton from "@/components/common/ActionButton";
const fetchDevices = async () => {
  const response = await axios.get(`http://localhost:3030/devices`);
  return response.data.data;
};
const Device = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [selectedDevice, setSelectedDevice] = useState(null);
  const { data: devices, mutate: mutateDevices } = useSWR(["devices"], () =>
    fetchDevices()
  );
  function openModal(device: any) {
    setSelectedDevice(device);
    setIsOpen(true);
  }
  function openDelete(device: any) {
    setSelectedDevice(device);
    setIsDelete(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeDelete() {
    setIsDelete(false);
  }
  let [isAdd, setIsAdd] = useState(false);
  function openAdd() {
    setIsAdd(true);
  }
  function closeAdd() {
    setIsAdd(false);
  }
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterClick = (newFilters: Record<string, string>) => {
    console.log("New Filters:", newFilters);
    setFilters(newFilters);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3030/devices`, { params: filters })
      .then((response) => {
        mutateDevices(response.data.data, false);
      })
      .catch((error) => {
        console.error("Error fetching filtered users:", error);
      });
  }, [filters, mutateDevices]);
  return (
    <div className="px-5 py-5">
      <div className="flex items-center justify-between">
        <Title title="Төхөөрөмж" />
        <ActionButton
          actionTitle="Нэмэх"
          actionType="add"
          onClick={() => openAdd()}
        />
      </div>
      <AddComponents show={isAdd} onClose={closeAdd} type="device" />

      <div className="bg-white p-5 mt-5 rounded-lg">
        <Filter
          label={["device_no", "device_name", "device_tspe", "device_price"]}
          type={["text", "text", "text", "number"]}
          onFilterClick={handleFilterClick}
        />
        <div className="relative overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  №
                </th>
                <th scope="col" className="px-6 py-3">
                  Төхөөрөмжийн дугаар
                </th>
                <th scope="col" className="px-6 py-3">
                  Төхөөрөмжийн нэр
                </th>
                <th scope="col" className="px-6 py-3">
                  Төрөл
                </th>
                <th scope="col" className="px-6 py-3">
                  Үнэ
                </th>
                <th scope="col" className="px-6 py-3">
                  Огноо
                </th>
                <th scope="col" className="px-6 py-3">
                  Үйлдлүүд
                </th>
              </tr>
            </thead>
            <tbody>
              {devices?.map((device: any, index: number) => (
                <tr key={index} className="bg-slate-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {device?.id}
                  </th>
                  <td className="px-6 py-4">{device?.deviceNo}</td>
                  <td className="px-6 py-4">{device?.deviceName}</td>
                  <td className="px-6 py-4">{device?.deviceTspe}</td>
                  <td className="px-6 py-4">{device?.devicePrice}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {dayjs(device?.createdDate).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        onClick={() => openModal(device)}
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        onClick={() => openDelete(device)}
                        icon={faTrash}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteComponents
            show={isDelete}
            onClose={closeDelete}
            deleteData={selectedDevice}
            type="device"
          />
          <UpdateComponents
            show={isOpen}
            onClose={closeModal}
            updateData={selectedDevice}
            type="device"
          />
        </div>
      </div>
    </div>
  );
};
export default Device;
