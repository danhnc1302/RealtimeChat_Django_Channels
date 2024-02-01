import { useEffect, useLayoutEffect } from "react"
import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faInbox, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Thumbnail from "../common/Thumbnail"
import useGlobal from "../core/global"
import RequestsScreen from "./Requests"
import FriendsScreen from "./Friends"
import ProfileScreen from "./Profile"

const Tab = createBottomTabNavigator()

const HomeScreen = ({navigation}) => {
  
  useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

  
  const user = useGlobal(state => state.user)
  const socketConnect = useGlobal(state => state.socketConnect)
  const socketClose = useGlobal(state => state.socketClose)


  useEffect(() => {
    socketConnect()
    return () => {
      // socketClose()
    }
    
  },[])
  

  function onSearch() {
		navigation.navigate('Search')
	}

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Thumbnail
              url={user.thumbnail}
              size={28}
            />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={onSearch}
          >
            <FontAwesomeIcon
              style={{ marginRight: 16 }}
              icon={faSearch}
              size={22}
              color='#404040'
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Requests: faBell,
            Friends: faInbox,
            Profile: faUser,
          }
          const icon = icons[route.name]
          return (
            <FontAwesomeIcon icon={icon} size={28} color={color} />
          )
        },
        tabBarActiveTintColor: '#202020',
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen