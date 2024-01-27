import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    ActivityIndicator,
    TouchableOpacity 
} from 'react-native'
import Empty from "../common/Empty"
import Cell from "../common/Cell"
import Thumbnail from "../common/Thumbnail"
import utils from "../core/utils"
import useGlobal from '../core/global'

function RequestAccept({ item }) {
	const requestAccept = useGlobal(state => state.requestAccept)

	return (
		<TouchableOpacity
			style={{
				backgroundColor: '#202020',
				paddingHorizontal: 14,
				height: 36,
				borderRadius: 18,
				alignItems: 'center',
				justifyContent: 'center'
			}}
			onPress={() => requestAccept(item.sender.username)}
		>
			<Text style={{ color: 'white', fontWeight: 'bold' }}>Accept</Text>
		</TouchableOpacity>
	)
}

function RequestRow({ item }) {
	const message = 'Requested to connect with you'
	//const time = '7m ago'

	return (
		<Cell>
			<Thumbnail
				url={item.sender.thumbnail}
				size={76}
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 16
				}}
			>
				<Text
					style={{
						fontWeight: 'bold',
						color: '#202020',
						marginBottom: 4
					}}
				>
					{item.sender.name}
				</Text>
				<Text
					style={{
						color: '#606060',
					}}
				>
					{message} <Text style={{ color: '#909090', fontSize: 13 }}>
						{utils.formatTime(item.created)}
					</Text>
				</Text>
			</View>

			<RequestAccept item={item} />
		</Cell>
	)
}


function RequestsScreen() {
    const requestList = useGlobal(state => state.requestList)

    // Show loading indicator
    if (requestList === null) {
        return (
            <ActivityIndicator style={{ flex: 1 }} />
        )
    }

    // Show empty if no requests
    if (requestList.length === 0) {
        return (
            <Empty icon='bell' message='No requests' />
        )
    }

    // Show request list
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={requestList}
                renderItem={({ item }) => (
                    <RequestRow item={item} />
                )}
                keyExtractor={item => item.sender.username}
            />
        </View>
    )
}

export default RequestsScreen

const styles = StyleSheet.create({})