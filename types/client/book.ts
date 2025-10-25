export type CreateBookData = {
  name: string;
  description?: string;
};

export type BookListData = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
    username: string;
  };
};

export type BookByIdData = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  owner: {
    id: string;
  };
};
