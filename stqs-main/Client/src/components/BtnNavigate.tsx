import { useNavigate } from "react-router-dom";
import { btnNavigateProps } from "@/interfaces/components";

function BtnNavigate({ route, label = "Button" }: btnNavigateProps) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      className="text-sm w-fit p-1 px-2 border border-cyan-600 rounded-md bg-dashboard hover:text-blue-200 hover:bg-tertiary cursor-pointer transition-colors duration-300"
      onClick={() => navigate(route)}
    >
      {label}
    </div>
  );
}

export default BtnNavigate;

