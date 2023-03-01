import { Text, View } from "react-native"
import clsx from 'clsx'

interface Props {
    id: string,
    title: string,
    amount: number,
    created_at: string
}

export function TransactionListItem({id = '',  title = '', amount = 0, created_at=''}: Props) {
    const operator = amount < 0 ? "-" : "+"
    const amountWithoutOperator = Math.abs(amount)

    return (
        <View 
            className={clsx("relative bg-[#fff] shadow-sm shadow-black font-[#333] p-2 my-1 rounded-lg w-max", {
                ["border-r-4 border-minus border-solid"]: amount < 0,
                ["border-r-4 border-plus border-solid"]: amount > 0,
            })}
        >
            <View className="flex-row flex-wrap justify-between ">
                <Text>{created_at} </Text>
                <Text>{operator} R$ {amountWithoutOperator.toFixed(2)}</Text>
            </View>
            <Text className="border-zinc-200 border-t pt-1">{title}</Text>
        </View>
    )
}