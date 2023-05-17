import { StatusBar, Box, HStack, IconButton, Icon } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
    return (
      <View style={styles.header}>
        <StatusBar bg="#fafaf9" barStyle="light-content" />
        <Box safeAreaTop bg="warmGray.50" />
        <HStack bg="warmGray.50" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
          <HStack alignItems="center">
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="black" />} />
            <Text color="white" fontSize="20" fontWeight="bold">
              Home
            </Text>
          </HStack>
          <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="black" />} />
          </HStack>
        </HStack>
      </View>);
  }

  const styles = StyleSheet.create({
    header: {
      paddingTop: 90,
      width: "90%"
    },
  });