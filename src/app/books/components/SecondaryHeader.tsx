import Link from "next/link";
import Add from "../../../components/icons/Add";

export default function SecondaryHeader({ title }: { title: string }) {
  return (
    <header>
      <h2>{title}</h2>
      <Link href="/add" aria-label="Agregar libro">
        <Add />
      </Link>
    </header>
  );
}
