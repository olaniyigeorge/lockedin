// import { createStore } from 'zustand/vanilla'

// export interface User {
//     id?: string
//     usernamename?: string | null
//     email?: string | null
//     password?: string | null
//     image?: string | null
// }

// export type AuthState = {
//     user: User | null
//     isAuthenticated: boolean
// }

// export type AuthActions = {
//     setUser: (user: User) => void
//     clearData: () => void
// }

// export type AuthStore = AuthState & AuthActions

// export const initAuthStore = (): AuthState => {
//     return { user: null, isAuthenticated: false }
// }

// export const defaultInitState: AuthState = {
//     user: null,
//     isAuthenticated: false,
// }

// export const createAuthStore = (
//     initState: AuthState = defaultInitState,
// ) => {
//     return createStore<AuthStore>()((set) => ({
//         ...initState,
//         setUser: (user: User) => set({ user, isAuthenticated: true }),
//         clearData: () => set({ user: null, isAuthenticated: false }),
//     }))
// }






import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage} from 'zustand/middleware'

export interface User {
    id?: string
    username?: string | null
    email?: string | null
    password?: string | null
    image?: string | null
}

export type AuthState = {
    user: User | null
    isAuthenticated: boolean
}

export type AuthActions = {
    setUser: (user: User) => void
    clearData: () => void
}

export type AuthStore = AuthState & AuthActions

export const initAuthStore = (): AuthState => {
    return { user: null, isAuthenticated: false }
}

export const defaultInitState: AuthState = {
    user: null,
    isAuthenticated: false,
}

export const createAuthStore = (
    initState: AuthState = defaultInitState,
) => {
    return createStore<AuthStore>()(
        persist(
            (set) => ({
                ...initState,
                setUser: (user: User) => set({ user, isAuthenticated: true }),
                clearData: () => set({ user: null, isAuthenticated: false }),
            }),
            {
                name: 'auth-store', // unique name for the storage
                storage: createJSONStorage(() => sessionStorage), // specify the storage type
            }
        )
    )
}
