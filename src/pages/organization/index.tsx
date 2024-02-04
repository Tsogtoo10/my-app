import Title from "@/components/common/Title";
import Filter from "@/components/common/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteComponents from "@/components/common/DeleteComponents";
import UpdateComponents from "@/components/common/UpdateComponents";
import AddComponents from "@/components/common/AddComponents";
import { useState, useEffect } from "react";
import FilterButton from "@/components/common/FilterButton";
import ActionButton from "@/components/common/ActionButton";
import axios from "axios";
import useSWR from "swr";
import dayjs from "dayjs";
const fetchOrganizations = async () => {
  const response = await axios.get(`http://localhost:3030/organizations`);
  return response.data.data;
};
const Organization = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [selectedOrganization, setSelectedOrganization] = useState(null);
  const { data: organizations, mutate: mutateOrganizations } = useSWR(
    ["organizations"],
    () => fetchOrganizations()
  );
  function openModal(organization: any) {
    setSelectedOrganization(organization);
    setIsOpen(true);
  }
  function openDelete(organization: any) {
    setSelectedOrganization(organization);
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
      .get(`http://localhost:3030/organizations`, { params: filters })
      .then((response) => {
        mutateOrganizations(response.data.data, false);
      })
      .catch((error) => {
        console.error("Error fetching filtered users:", error);
      });
  }, [filters, mutateOrganizations]);
  return (
    <div className="px-5 py-5">
      <div className="flex items-center justify-between">
        <Title title="Байгууллага" />
        <ActionButton
          actionTitle="Нэмэх"
          actionType="add"
          onClick={() => openAdd()}
        />
      </div>
      <AddComponents show={isAdd} onClose={closeAdd} type="organization" />

      <div className="bg-white p-5 mt-5 rounded-lg">
        <Filter
          label={["org_name", "org_register", "phone"]}
          type={["text", "email", "number"]}
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
                  Байгууллагын нэр
                </th>
                <th scope="col" className="px-6 py-3">
                  Байгууллагын дугаар
                </th>
                <th scope="col" className="px-6 py-3">
                  Утасны дугаар
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
              {organizations?.map((organization: any, index: number) => (
                <tr key={index} className="bg-slate-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {organization?.id}
                  </th>
                  <td className="px-6 py-4"> {organization?.orgName}</td>
                  <td className="px-6 py-4"> {organization?.orgRegister}</td>
                  <td className="px-6 py-4"> {organization?.phone}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {dayjs(organization?.createdDate).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        onClick={() => openModal(organization)}
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        onClick={() => openDelete(organization)}
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
            deleteData={selectedOrganization}
            type="organization"
          />
          <UpdateComponents
            show={isOpen}
            onClose={closeModal}
            updateData={selectedOrganization}
            type="organization"
          />
        </div>
      </div>
    </div>
  );
};
export default Organization;
