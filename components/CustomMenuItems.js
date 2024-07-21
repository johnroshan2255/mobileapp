import { MenuOption } from 'react-native-popup-menu';
import { View, Text } from 'react-native';
import { Colors } from '../constants/Colors';

export const MenuItem = ({ text, action, value, icon }) => {
    return(
        <MenuOption onSelect={() => action(value)}>
            <View style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 15,
                    color: Colors.GRAY
                }}>{text}</Text>
                <Text>{icon}</Text>
            </View>
        </MenuOption>
    );
}