import { Stack } from 'expo-router';

export default function PigStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ presentation: 'card', headerTitle: 'Registrar Cerdo' }} />
    </Stack>
  );
}