import Link from "next/link";
import ArrowRight from "../../../components/icons/ArrowRight";

export default function EmptyBooksList({
  message,
  href,
  contentLink,
}: {
  message: string;
  href: string;
  contentLink: string;
}) {
  return (
    <section>
      <p>{message}</p>
      <Link href={href}>
        <ArrowRight />
        {contentLink}
      </Link>
    </section>
  );
}
