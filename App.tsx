// import './src/lib/dayjs';

import { StatusBar } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { Transactions } from './src/screens/Transactions';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if(!fontsLoaded) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      {/* <Transactions /> */}
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
    </>
  );
}

