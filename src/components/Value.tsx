import { StyleSheet, Text, View } from 'react-native';

type valueProps = {
    label : string;
    value : string;
};
  
const Value= ({label, value} : valueProps) =>(
<View>
    <Text style={styles.label}> {label}</Text>
    <Text style={styles.value}> {value}</Text>
</View>

);
const styles = StyleSheet.create({
label: {
    color: 'white',
    fontSize:20,
},
value: {
    fontSize:35,
    color: '#AFB3BE',
    fontWeight: '500', 
},
});

export default Value;