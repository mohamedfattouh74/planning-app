import { inject, Injectable } from "@angular/core";
import { GlobalStore } from "../store/global.store";

@Injectable({ providedIn: 'root' })

export class GlobalFacade {
    
    private _store = inject(GlobalStore);
    
    currentTheme = this._store.theme

    changeTheme(){
        this._store.changeTheme();
    }
    

}