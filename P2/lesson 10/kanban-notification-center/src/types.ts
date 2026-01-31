export interface Card {
  id: string;
  title: string;
  userName: string;
  createdAt: number;
  status: "todo" | "doing" | "done";
}

export type Notification = {
  id: string;
  message: string;
  time: number;
  read: boolean;
};

export type Theme = "light" | "dark";
