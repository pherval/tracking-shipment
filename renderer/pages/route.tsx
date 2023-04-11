import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import { IconButton } from "../components";
import { Details } from "../components/Layout";

export default function RoutePage() {
  return (
    <Details hideToolbar>
      <Link href="/home">
        <a>
          <IconButton className="absolute top-10 left-10">
            <AiOutlineLeft />
          </IconButton>
        </a>
      </Link>

      <h1>Routes</h1>
      <p>details...</p>
    </Details>
  );
}
