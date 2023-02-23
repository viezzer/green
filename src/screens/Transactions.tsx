import { ScrollView, Text, View, Alert, TouchableOpacity } from "react-native"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { api } from '../lib/axios'

import colors from 'tailwindcss/colors'

import { Loading } from "../components/Loading";
import { Transaction } from "../components/Transaction";

type TransactionsProps = Array<{
    id: string;
    title: string;
    amount: number;
    created_at: string;
}>

export function Transactions() {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsProps | null>(null)

    const transactionsAmounts = transactions?.map(function(transaction) {
        return transaction.amount
    })

    const total  = transactionsAmounts?.reduce(function(accumulator, transaction){
        return accumulator + transaction
    }, 0)
    .toFixed(2)

    const income = transactionsAmounts?.filter(function(value) {
        if (value > 0) {return value}
    })
    .reduce(function(accumulator, value) {
        return accumulator + value
    }, 0)
    .toFixed(2)

    const expense = Math.abs(transactionsAmounts?.filter(function(value){
        if (value < 0) {return value}
    })
    .reduce(function(accumulator, value){
        return accumulator + value
    }, 0))
    .toFixed(2)

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/transactions')
            // console.log(response.data)
            setTransactions(response.data)
        }catch(error) {
            Alert.alert("Ops", "Não foi possível carregar as transações.");
            console.error(error);
        } finally {
            setLoading(false)
        }
    } 

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    if(loading) {
        return <Loading/>
    }
    return (
        <View className="flex-1 bg-stone-900 px-4 py-12 ">
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row h-11 px-4 my-4 border border-green-800 rounded-lg items-center justify-center"
                onPress={ () => navigate('newTransaction') }
            >
                <Feather 
                    name="dollar-sign"
                    color={colors.green[500]}
                    size={20}
                />

                <Text className="text-white ml-3 font-semibold text-base">
                    Nova  transação
                </Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-extrabold">SALDO ATUAL</Text>
            <Text className="text-balance text-4xl font-bold tracking-wide">R$ {total}</Text>

            <View className="flex-row bg-[#fff] p-5  my-5 justify-around w-max rounded-lg">
                <View className="flex-1 border-r border-zinc-400">
                    <Text className="text-black text-xl font-bold text-center">RECEITAS</Text>
                    <Text className="text-plus text-xl font-regular tracking-widest text-center">R$ {income}</Text>
                </View>
                <View className="flex-1 text-center">
                    <Text className="text-black text-xl font-bold text-center">DESPESAS</Text>
                    <Text className="text-minus text-xl font-regular tracking-widest text-center">R$ {expense}</Text>
                </View>
                
            </View>

            <Text 
                className="text-[#f7f7f7] text-lg font-extrabold border-b border-[#f7f7f7] pb-2 mt-2 mb-2">
                Transações
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            >
                <View className="w-full">
                    {transactions &&
                        transactions.map(transaction => {
                            return (
                                <Transaction
                                    key={transaction.id}
                                    id={transaction.id}
                                    title={transaction.title}
                                    amount={transaction.amount} />
                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}