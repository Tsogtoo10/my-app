import Filter from "@/components/common/Filter";
import Title from "@/components/common/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteComponents from "@/components/common/DeleteComponents";
import UpdateComponents from "@/components/common/UpdateComponents";
import AddComponents from "@/components/common/AddComponents";
import { useState, useEffect } from "react";
import ActionButton from "@/components/common/ActionButton";
import axios from "axios";
import dayjs from "dayjs";
import useSWR from "swr";
const fetchUsers = async () => {
  const response = await axios.get(`http://localhost:3030/users`);
  return response.data.data;
};

const Users = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [selectedUser, setSelectedUser] = useState(null);
  const { data: users, mutate: mutateUsers } = useSWR(["users"], () =>
    fetchUsers()
  );
  function openModal(user: any) {
    setSelectedUser(user);
    setIsOpen(true);
  }
  function openDelete(user: any) {
    setSelectedUser(user);
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
      .get(`http://localhost:3030/users`, { params: filters })
      .then((response) => {
        mutateUsers(response.data.data, false);
      })
      .catch((error) => {
        console.error("Error fetching filtered users:", error);
      });
  }, [filters, mutateUsers]);

  return (
    <div className="px-5 py-5">
      <div className="flex items-center justify-between">
        <Title title="Хэрэглэгчид" />
        <ActionButton
          actionTitle="Нэмэх"
          actionType="add"
          onClick={() => openAdd()}
        />
      </div>
      <AddComponents show={isAdd} onClose={closeAdd} type="user" />

      <div className="bg-white p-5 mt-5 rounded-lg">
        <Filter
          label={["last_name", "first_name", "age", "email", "phone"]}
          type={["text", "text", "number", "email", "number"]}
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
                  Овог
                </th>
                <th scope="col" className="px-6 py-3">
                  Нэр
                </th>
                <th scope="col" className="px-6 py-3">
                  Нас
                </th>
                <th scope="col" className="px-6 py-3">
                  Утасны дугаар
                </th>
                <th scope="col" className="px-6 py-3">
                  Хүйс
                </th>
                <th scope="col" className="px-6 py-3">
                  И-мэйл хаяг
                </th>
                <th scope="col" className="px-6 py-3">
                  Нууц үг
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
              {users?.map((user: any, index: number) => (
                <tr key={index} className="bg-slate-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {user?.id}
                  </th>
                  <td className="px-6 py-4">{user?.lastName}</td>
                  <td className="px-6 py-4">{user?.firstName}</td>
                  <td className="px-6 py-4">{user?.age}</td>
                  <td className="px-6 py-4">{user?.phone}</td>
                  <td className="px-6 py-4">{user?.gender}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">{user?.password}</td>
                  <td className="px-6 py-4">
                    {dayjs(user?.createdDate).format("YYYY-MM-DD")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        onClick={() => openModal(user)}
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        onClick={() => openDelete(user)}
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
            deleteData={selectedUser}
            type="user"
          />
          <UpdateComponents
            show={isOpen}
            onClose={closeModal}
            updateData={selectedUser}
            type="user"
          />
        </div>
      </div>
    </div>
  );
};
export default Users;
