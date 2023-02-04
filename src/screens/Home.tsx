import { ScrollView, Text, View } from "react-native"

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 py-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            >
                <Text>Este é um teste de Tailwindcss</Text>
            </ScrollView>
        </View>
    )
}