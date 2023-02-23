import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator();

import { Transactions } from '../screens/Transactions'
import { NewTransaction } from '../screens/NewTransaction'

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name="transactions"
                component={Transactions}
            />
            <Screen
                name="newTransaction"
                component={NewTransaction}
            />
        </Navigator>
    )
}