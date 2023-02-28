import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'

import { BackButton } from "../components/BackButton";
import colors from "tailwindcss/colors";
// import { api } from "../lib/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import dayjs from "dayjs";


export function NewTransaction() {
    const [title, setTitle] = useState('')
    const [stringAmount, setStringAmount] = useState('')

    async function handleCreateNewTransaction() {
        try {
            // console.log(title, amount)
            if(title.trim() === "") {
                return Alert.alert("Ops", 'Informe uma descrição para a transação')
            }
            if(!Number(stringAmount))  {
                return Alert.alert("Ops", "Informe um valor para a transação")
            }

            const amount = Number(stringAmount)
            const transaction = {
                'id': uuid.v4(),
                'title': title,
                'amount': amount,
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
            setStringAmount('')

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

                <Text
                    className="mt-6 text-white font-extrabold text-3xl"
                >
                   Nova transação
                </Text>

                <Text
                    className="mt-6 text-white font-semibold text-base"
                >
                    Descrição da transação
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="ex.: Almoço, Salário, Netflix, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className='font-semibold mt-4 mb-3 text-white text-base'>
                    Valor da transação
                </Text>
                <Text className='font-regular mb-3 text-white opacity-75'>
                    Informe um valor negativo para despesa ou um valor positivo para receita
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    keyboardType='numeric'
                    placeholder="Receita = 1100 | Despesa = -1100"
                    placeholderTextColor={colors.zinc[400]}
                    value={stringAmount}
                    onChangeText={setStringAmount}
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