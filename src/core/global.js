import { create } from "zustand";
import secure from "./secure";



//-------------------------------------
//   Socket receive message handlers
//-------------------------------------

function responseFriendList(set, get, friendList) {
	set((state) => ({
		friendList: friendList
	}))
}

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

	//---------------------
	//   Authentication
	//---------------------
    authenticated: false,
	user: {},
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

	requestList: null,

}))

export default useGlobal