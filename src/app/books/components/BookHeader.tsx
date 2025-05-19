interface BookHeaderProps {
  title: string;
  category: string;
  author: string;
  accessType: string;
}

export default function BookHeader({
  title,
  category,
  author,
  accessType,
}: BookHeaderProps) {
  return (
    <header>
      <h3>{title}</h3> - <span>{category}</span>
      <p>{author}</p>
      <small>{accessType}</small>
    </header>
  );
}
