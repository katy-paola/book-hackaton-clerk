import Link from "next/link";
import Add from "../../../components/icons/Add";

export default function SecondaryHeader({
  title,
  noHasAddLink,
}: {
  title: string;
  noHasAddLink?: boolean;
}) {
  return (
    <header>
      <h2>{title}</h2>
      {!noHasAddLink && (
        <Link href="/add" aria-label="Agregar libro">
          <Add />
        </Link>
      )}
    </header>
  );
}
