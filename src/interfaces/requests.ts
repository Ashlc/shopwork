export type GenericPostRequest<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> &
  Record<string, any>;
