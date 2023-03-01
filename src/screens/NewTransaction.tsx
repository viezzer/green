import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Switch } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'
import clsx from 'clsx'


import { BackButton } from "../components/BackButton";
import colors from "tailwindcss/colors";
// import { api } from "../lib/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import dayjs from "dayjs";


export function NewTransaction() {
    const [title, setTitle] = useState('')
    const [inputAmount, setinputAmount] = useState('')
    const [isExpense, setIsExpense] = useState(false);
    const toggleSwitch = () => setIsExpense(previousState => !previousState);

    async function handleCreateNewTransaction() {
        try {
            const amount = parseFloat(inputAmount.replace(",", "."))

            if(title.trim() === "") {
                return Alert.alert("Ops", 'Informe uma descrição para a transação')
            }
            if(!amount)  {
                return Alert.alert("Ops", "Informe um valor para a transação")
            }

            const transaction = {
                'id': uuid.v4(),
                'title': title,
                'amount': isExpense? -amount : +amount,
                'created_at': dayjs().format('DD/MM/YYYY').toString()
            }

            let transactionsString = await AsyncStorage.getItem('@transactions')

            if(transactionsString) {
                let parsedtransactions = JSON.parse(transactionsString)
                parsedtransactions.push(transaction)
                // console.log(parsedtransactions)
                await AsyncStorage.setItem('@transactions', JSON.stringify(parsedtransactions))
            } else {
                await AsyncStorage.setItem("@transactions", `[${JSON.stringify(transaction)}]`)
            }

            setTitle('')
            setinputAmount('')

            Alert.alert("Nova Transação", "Transação criada com sucesso")
        } catch(error) {
            console.error(error)
            Alert.alert("Ops", "Não foi possível criar a transação :(")
        }
    }

    return (
        <View className="flex-1 bg-stone-900 px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            >

                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                   Nova transação
                </Text>

                <Text className='font-semibold mt-4 text-white text-base'>
                    Tipo
                </Text>
                <View className="flex-row justify-start items-center">
                    <Switch
                        trackColor={{false: '#c0392b', true: '#2ecc71'}}
                        thumbColor={'#2f3f3f'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isExpense}
                    />
                    <Text className={clsx("font-semibold text-base  border-b ml-4", {
                        ["text-minus border-minus"]: isExpense,
                        ["text-plus border-plus"]: !isExpense
                    })}>{isExpense ? 'DESPESA':'RECEITA'}</Text>
                </View>

                <Text
                    className="mt-6 text-white font-semibold text-base"
                >
                    Descrição
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="ex.: Almoço, Salário, Netflix, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className='font-semibold mt-4 mb-3 text-white text-base'>
                    Valor
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    keyboardType='numeric'
                    placeholder="0.00"
                    placeholderTextColor={colors.zinc[400]}
                    value={inputAmount}
                    onChangeText={setinputAmount}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    onPress={handleCreateNewTransaction}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />

                    <Text className='font-semibold text-base text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}