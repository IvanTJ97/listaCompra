import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListHome from '../../screens/listMaster';
import ListChild from '../../screens/listChild';
const Navigator = () => {
    const HomeStack = createNativeStackNavigator();
    return <NavigationContainer>
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name="Home" component={ListHome} />
            <HomeStack.Screen name="Child" component={ListChild} />
        </HomeStack.Navigator>
    </NavigationContainer>
};
export default Navigator;