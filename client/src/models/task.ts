export interface Comment {
  name: string;
  text: string;
  id: string;
}

export interface Item {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Pending {
  title: string;
  items: Item[];
}

export interface Comment2 {
  name: string;
  text: string;
  id: string;
}

export interface Item2 {
  id: string;
  title: string;
  comments: Comment2[];
}

export interface Ongoing {
  title: string;
  items: Item2[];
}

export interface Item3 {
  id: string;
  title: string;
  comments: any[];
}

export interface Completed {
  title: string;
  items: Item3[];
}

export interface ITask {
  pending: Pending;
  ongoing: Ongoing;
  completed: Completed;
}
