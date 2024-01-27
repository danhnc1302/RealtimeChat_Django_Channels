import EncryptedStorage from "react-native-encrypted-storage"


async function set(key, object) {
	try {
		await EncryptedStorage.setItem(key, JSON.stringify(object))
	} catch (error) {
		console.log('secure.set:', error)
	}
}

async function get(key) {
    try {
        const data = await EncryptedStorage.getItem(key)
        if (data != undefined) {
            return JSON.parse(data)
        }
    } catch (error) {
        console.log('secure.get:', error)
    }
}

export default { set, get }