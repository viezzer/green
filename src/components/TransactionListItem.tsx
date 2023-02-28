import { Text, View } from "react-native"
import clsx from 'clsx'

interface Props {
    id: string,
    title: string,
    amount: number,
}

export function TransactionListItem({id = '',  title = '', amount = 0}: Props) {
    const operator = amount < 0 ? "-" : "+"
    const amountWithoutOperator = Math.abs(amount)

    return (
        <View 
            className={clsx("flex-row flex-wrap justify-between bg-[#fff] shadow-sm shadow-black font-[#333] relative p-2 my-1 rounded-lg w-max", {
                ["border-r-4 border-minus border-solid"]: amount < 0,
                ["border-r-4 border-plus border-solid"]: amount > 0,
            })}
        >
            <Text className="">{title}</Text>
            <Text className="">{operator} R$ {amountWithoutOperator}</Text>
        </View>
    )
}