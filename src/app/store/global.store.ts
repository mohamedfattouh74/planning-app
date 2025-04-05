import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type GlobalState = {
    theme: 'light' | 'dark';
}

const initialState : GlobalState = {
    theme: 'light'
}

export const GlobalStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store)=>({
        changeTheme: ()=>{
            const newTheme = store.theme() === 'dark' ? 'light' : 'dark';
            console.log('change theme triggered', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }    
            patchState(store, { theme: newTheme });
        }
    })

))