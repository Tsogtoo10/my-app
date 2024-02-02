import Link from "next/link";

const ActionButton = ({
  actionTitle,
  actionType,
  onClick,
}: {
  actionTitle: string;
  actionType: string;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-md text-white bg-gradient-to-br from-pink-600 to-purple-900  py-1 px-2 rounded-lg  cursor-pointer border-solid border-2 ${
        actionType === "update" ? "border-[#82ff1b] -skew-x-12" : ""
      } ${actionType === "delete" ? "border-[#ff5252] -skew-x-12" : ""} ${
        actionType === "add" ? "" : ""
      }`}
    >
      {actionTitle}
    </button>
  );
};

export default ActionButton;
