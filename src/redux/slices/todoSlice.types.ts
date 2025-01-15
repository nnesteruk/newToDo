export type List = {
  id: number;
  title: string;
  isCompleted: boolean;
  user_id: number;
};

export type ListState = {
  list: List[];
  isLoading: boolean;
  error: string;
};
