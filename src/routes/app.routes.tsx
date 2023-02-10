import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator();

import { Transactions } from '../screens/Transactions'

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name="transactions"
                component={Transactions}
            />
        </Navigator>
    )
}