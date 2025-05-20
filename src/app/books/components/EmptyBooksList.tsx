import Link from "next/link";
import ArrowRight from "../../../components/icons/ArrowRight";

export default function EmptyBooksList({
  message,
  href,
  contentLink,
}: {
  message: string;
  href?: string;
  contentLink?: string;
}) {
  return (
    <section className="empty-books-section">
      <p className="empty-books-message">{message}</p>
      {href && (
        <Link href={href} className="empty-books-link">
          <ArrowRight />
          {contentLink}
        </Link>
      )}
    </section>
  );
}
