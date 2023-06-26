import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, TouchableOpacity} from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import useHealthData from './src/hooks/useHealthData';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const STEPS_GOAL = 10_000;

export default function App() {
   const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);
  const changeDate = (numDays : number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:Date) => {
    console.warn("A date has been picked: ", date);
    setDate(date)
    hideDatePicker();
  };

  

  return (
    <View style={styles.container}>
      <View style={{alignSelf:"flex-end"}}>
            <AntDesign name="calendar" size={20} color="green" onPress={showDatePicker} />
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            display='spinner'
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            />
          {/* <Button title="show picker " onPress={showDatePicker} /> */}
          
      </View>
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>

        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <RingProgress progress={steps/STEPS_GOAL} radius={150} strokeWidth={50} />
      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 12,
    justifyContent: 'center',
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
  values: {
    flexDirection : 'row' ,
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
    marginHorizontal:20
  },
});