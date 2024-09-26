export interface Task {
  taskId: string;
  category: Category;
  purchaceDate: Date;
  value: Number;
}

type Category = "CLOTHES" | "FOOD";
