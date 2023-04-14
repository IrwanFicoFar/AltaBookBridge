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

export interface ObjSubmitType {
  username: string;
  password: string;
}

export interface ObjSubmitTypeRegister extends ObjSubmitType {
  name: string;
}

export interface TypeData {
  key: string;
  datas: [
    {
      title: string;
      book_image: string;
      status: boolean;
      username: string;
    }
  ];
}

export interface LandingDataType {
  title: string;
  book_image: string;
  status: boolean;
  username: string;
}

export interface ListBorrowDataType {
  title: string;
  book_image: string;
  owner_username: string;
}

export interface ListMyBookDataType {
  title: string;
  book_image: string;
  rent_username: string;
}

export interface uploadBookType {
  title: string;
  description: string;
  book_image: any;
}
