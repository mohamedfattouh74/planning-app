import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AuthResponse } from '../dtos/auth.response.dto';
import * as jwt from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) {}

  register(userDto: User) {
    this.httpClient.post<AuthResponse>(this.baseUrl + 'users', userDto)
    .subscribe((res: AuthResponse) => {
      localStorage.setItem('access_token', res.accessToken);
    });
  }

  login(userDto: User) {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'login', userDto);
  }

  getUserIdFromToken(token:string){
    const decoded: any = jwt.jwtDecode(token);
    return decoded.sub; 
  }

}
