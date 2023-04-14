export interface UserType {
  id: number;
  name: string;
  username: string;
  image: any;
}

export interface UserEdit extends UserType {
  password: string;
}

export interface BookType {
  id: number;
  title: string;
  description: string;
  book_image: any;
  data: {
    username: "username123";
    title: "Learn Golang v1";
    description: "book for learning Golang";
  };
}
