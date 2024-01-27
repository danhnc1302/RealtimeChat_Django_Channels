import { create } from "zustand";
import secure from "./secure";
const useGlobal = create((set,get) => ({

    //---------------------
	//   Initialization
	//---------------------
    initialized: false,
    init: async () => {
        set((state) => ({
            initialized: true,
        }))
    },

    authenticated: false,
    login: (credentials, user, tokens) => {
		secure.set('credentials', credentials)
		secure.set('tokens', tokens)
		set((state) => ({
			authenticated: true,
			user: user
		}))
	},

	logout: () => {
		secure.wipe()
		set((state) => ({
			authenticated: false,
			user: {}
		}))
	},
}))

export default useGlobal