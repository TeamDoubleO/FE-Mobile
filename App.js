import AppNavigator from './AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <SafeAreaView edges={['bottom']} />
    </SafeAreaProvider>
  );
};

export default App;
