interface BookProps {
  id: string;
  user_id: string;
  title: string;
  category: string;
  author: string;
  accessType: string;
  bookLink: string;
}

export const BOOKS: BookProps[] = [
  {
    id: "1",
    user_id: "user1",
    title: "Hábitos atómicos",
    category: "Autoayuda",
    author: "James Clear",
    accessType: "De pago",
    bookLink: "/books/1",
  },
  {
    id: "2",
    user_id: "user2",
    title: "El hombre en busca de sentido",
    category: "Autoayuda",
    author: "Viktor Frankl",
    accessType: "Gratis",
    bookLink: "/books/2",
  },
  {
    id: "3",
    user_id: "user3",
    title: "El poder del ahora",
    category: "Autoayuda",
    author: "Eckhart Tolle",
    accessType: "De pago",
    bookLink: "/books/3",
  },
  {
    id: "4",
    user_id: "user4",
    title: "Los secretos de la mente millonaria",
    category: "Autoayuda",
    author: "T. Harv Eker",
    accessType: "Gratis",
    bookLink: "/books/4",
  },
  {
    id: "5",
    user_id: "user5",
    title: "Cómo ganar amigos e influir sobre las personas",
    category: "Autoayuda",
    author: "Dale Carnegie",
    accessType: "De pago",
    bookLink: "/books/5",
  },
];
