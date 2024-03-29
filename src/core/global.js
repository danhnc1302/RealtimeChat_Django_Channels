import { create } from "zustand";
import secure from "./secure";
import api, { ADDRESS } from "./api";
import utils from "./utils";


//-------------------------------------
//   Socket receive message handlers
//-------------------------------------

function responseFriendList(set, get, friendList) {
	set((state) => ({
		friendList: friendList
	}))
}

const useGlobal = create((set, get) => ({

	//---------------------
	//   Initialization
	//---------------------
	initialized: false,
	init: async () => {
		const credentials = await secure.get('credentials')
		if (credentials) {
			try {
				const response = await api({
					method: "POST",
					url: 'chat/signin/',
					data: {
						username: credentials.username,
						password: credentials.password
					}
				})
				if (response.status !== 200) {
					throw 'Authentication error'
				}
				const user = response.data.user
				const tokens = response.data.tokens
				secure.set('tokens', tokens)
				set((state) => ({
					initialized: true,
					authenticated: true,
					user: user
				}))
				return
			} catch (error) {
				console.log('useGlobal.init: ', error)
			}
		}
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

	//---------------------
	//   Websocket
	//---------------------

	socket: null,

	socketConnect: async () => {
		const tokens = await secure.get('tokens')

		const url = `ws://${ADDRESS}/chat/?token=${tokens.access}`

		const socket = new WebSocket(url)
		socket.onopen = () => {
			utils.log('socket.onopen')
		}
		socket.onmessage = () => {
			utils.log('socket.onmessage')
		}
		socket.onerror = (e) => {
			utils.log('socket.onerror:', e)
		}
		socket.onclose = () => {
			utils.log('socket.onclose')
		}
		set((state) => ({
			socket: socket,
		}));
	},



	socketClose: async () => {

	}

}))

export default useGlobal