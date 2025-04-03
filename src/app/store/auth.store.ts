import { computed, inject } from "@angular/core";
import { User } from "../interfaces/user"
import {patchState, signalStore , withComputed, withMethods, withState} from '@ngrx/signals'
import { AuthService } from "../services/auth.service";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";


type AuthState = {
    isLogged: boolean,
    isLoading: boolean,
    user : User,
    userId: string ,
    error: string | null
}

const initialState : AuthState = {
    isLoading:false,
    isLogged: false,
    user: { email: '', password: '' },
    userId: '',
    error: null
}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store)=>({})),
    withMethods((store, authService = inject(AuthService), router = inject(Router))=>({
        login: rxMethod<User>(
            pipe(
                tap(()=>patchState(store,{isLoading:true , error: null})),
                switchMap(credentials => authService.login(credentials).pipe(
                    tap({
                        next: (res)=> {
                            localStorage.setItem('access_token', res.accessToken);
                            const userId = authService.getUserIdFromToken(res.accessToken);
                            patchState(store, {isLogged: true, isLoading: false, user:  credentials, userId})
                            router.navigate(['/spaces']);

                        },  
                        error: () => { patchState(store, {isLoading: false, isLogged: false, error:'Invalid Credentials'})},                    })
                ))
            )
        ),
        logout: () => {
            localStorage.removeItem('access_token');
            patchState(store, initialState);
            router.navigate(['/login']);
          }
    })
))