import { create } from "zustand";

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

    authenticated: false
}))

export default useGlobal