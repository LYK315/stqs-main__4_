import { useNavigate } from "react-router-dom";

interface BtnNavigateProps {
  route: string;
  label?: string;
}

function BtnNavigate({ route, label = "Button" }: BtnNavigateProps) {
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

