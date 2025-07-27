export type BookResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner: {
    id: string;
    name: string;
    username: string;
  };
};

export type CreateBookPayload = {
  name: string;
  description?: string;
};
