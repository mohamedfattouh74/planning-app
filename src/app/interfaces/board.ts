import { Column } from "./column";

export interface BaseBoard {
  title: string;
  userId: string;
  columns: Column[];
}

export interface Board extends BaseBoard {
  id: number;  
}

export type CreateBoard = Omit<Board, 'id'>; 