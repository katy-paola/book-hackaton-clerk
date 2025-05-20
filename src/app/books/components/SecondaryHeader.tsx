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
    <header className="secondary-header">
      <h2 className="secondary-title">{title}</h2>
      {!noHasAddLink && (
        <Link href="/add" className="add-button" aria-label="Agregar libro">
          <Add />
        </Link>
      )}
    </header>
  );
}
