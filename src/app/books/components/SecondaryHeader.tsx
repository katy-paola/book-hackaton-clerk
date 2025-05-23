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
        <Link
          href="/books/add"
          className="add-button"
          title="Agregar libro"
          aria-label="Agregar libro"
        >
          <Add />
        </Link>
      )}
    </header>
  );
}
