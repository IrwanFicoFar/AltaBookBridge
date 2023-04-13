export interface UserType {
  id: number;
  name: string;
  username: string;
  image: any;
}

export interface UserEdit extends UserType {
  password: string;
}
