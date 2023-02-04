import { ScrollView, Text, View } from "react-native"

export function Home() {
    return (
        <View className="flex-1 bg-stone-900 px-4 py-12 ">
            <Text className="text-white text-lg font-extrabold">SALDO ATUAL</Text>
            <Text className="text-balance text-4xl font-bold tracking-wide">R$ 0.00</Text>

            <View className="flex-row bg-[#fff] p-5  my-5 justify-around w-max rounded-xl">
                <View className="flex-1 border-r-2 border-zinc-400">
                    <Text className="text-black text-xl font-bold text-center">RECEITAS</Text>
                    <Text className="text-plus text-xl font-regular tracking-widest text-center">R$ 0.00</Text>
                </View>
                <View className="flex-1 text-center">
                    <Text className="text-black text-xl font-bold text-center">DESPESAS</Text>
                    <Text className="text-minus text-xl font-regular tracking-widest text-center">R$ 0.00</Text>
                </View>
                
            </View>

            <Text className="text-[#f7f7f7] text-lg font-extrabold border-b-2 border-[#f7f7f7] pb-2 mt-5 mb-2">Transações</Text>
        </View>
    )
}