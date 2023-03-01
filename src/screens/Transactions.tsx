import { ScrollView, Text, View, Alert, TouchableOpacity } from "react-native"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { api } from '../lib/axios'

import colors from 'tailwindcss/colors'

import { Loading } from "../components/Loading";
import { TransactionListItem } from "../components/TransactionListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // console.log(transactionsAmounts)

    const total  = transactionsAmounts?.reduce(function(accumulator, transaction){
        return accumulator + transaction
    }, 0)
    .toFixed(2)
    // console.log(total)

    const income = transactionsAmounts?.filter(function(value) {
        if (value > 0) {return value}
    })
    .reduce(function(accumulator, value) {
        return accumulator + value
    }, 0)
    .toFixed(2)
    // console.log(income)

    const expense = Math.abs(transactionsAmounts?.filter(function(value){
        if (value < 0) {return value}
    })
    .reduce(function(accumulator, value){
        return accumulator + value
    }, 0))
    .toFixed(2)
    // console.log(expense)

    async function fetchData() {
        try {
            setLoading(true)
            // const response = await api.get('/transactions')
            const response = await AsyncStorage.getItem('@transactions')
            // console.log(response)
            setTransactions(JSON.parse(response))
        }catch(error) {
            Alert.alert("Ops", "Não foi possível carregar as transações.");
            console.error(error);
        } finally {
            setLoading(false)
        }
    } 

    async function handleDeleteTransaction(id) {
        try {
            let transactionsWithoutDeletedOne = transactions.filter(transaction => transaction.id !== id) //
            await AsyncStorage.setItem('@transactions', JSON.stringify(transactionsWithoutDeletedOne))
            fetchData()
        } catch (error) {
            console.log(error)
            Alert.alert("Ops", 'Não foipossível deletar esta transação')
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
            <Text className="text-balance text-4xl font-bold tracking-wide">R$ {total ? total : '0.00'}</Text>

            <View className="flex-row bg-[#fff] p-5  my-5 justify-around w-max rounded-lg">
                <View className="flex-1 border-r border-zinc-400">
                    <Text className="text-black text-xl font-bold text-center">RECEITAS</Text>
                    <Text className="text-plus text-xl font-regular tracking-widest text-center">R$ {income ? income : '0.00'}</Text>
                </View>
                <View className="flex-1 text-center">
                    <Text className="text-black text-xl font-bold text-center">DESPESAS</Text>
                    <Text className="text-minus text-xl font-regular tracking-widest text-center">R$ {typeof(expense) == 'string' ? expense : '0.00' }</Text>
                </View>
                
            </View>

            {
                transactions !==null &&
                    <Text 
                        className="text-[#f7f7f7] text-lg font-extrabold border-b border-[#f7f7f7] pb-2 mt-2 mb-2">
                        Transações 
                    </Text>
            }

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}
            >
                <View className="w-full">
                    {transactions &&
                        transactions.map(transaction => {
                            return (
                                <TouchableOpacity
                                    key={transaction.id}
                                    onLongPress={ () => {
                                        Alert.alert(`Excluir ${transaction.title}`, "Deseja excluir esta transação?", [
                                            {text: "Não"},
                                            {text: "Sim", onPress: () => handleDeleteTransaction(transaction.id)}
                                        ])
                                    }}
                                >
                                    <TransactionListItem
                                        id={transaction.id}
                                        title={transaction.title}
                                        amount={transaction.amount} 
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}