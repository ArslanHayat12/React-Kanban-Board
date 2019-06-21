export interface ToDoState {
  board: {
    type: string;
    props: {
      orientation: string;
    };
    children: any;
  };
}
