import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Board, CreateBoard } from "../interfaces/board";

@Injectable({
    providedIn:'root'
})
export class BoardsService{

    private baseUrl = environment.apiUrl;

    constructor(private httpClient:HttpClient) {}

    getBoards(userId: string): Observable<Board[]>{
        const params = new HttpParams().set('userId', userId.toString());
        return this.httpClient.get<Board[]>(`${this.baseUrl}boards`, {params});
    }

    createBoard(userId: string, board: CreateBoard): Observable<Board>{
        const boardWithUser = { ...board, userId };
        return this.httpClient.post<Board>(`${this.baseUrl}boards`, boardWithUser);
    }

}