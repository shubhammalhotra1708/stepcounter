
import {useState,useEffect} from 'react';
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
    HealthInputOptions,
    HealthUnit,
  } from 'react-native-health'

const useHealthData = (date : Date) => {
  const [permi,setPermi] = useState(false);
  const [steps,setSteps] = useState(0);
  const [flights,setFlights] = useState(0);
  const [distance,setDistance] = useState(0);
  const permissions : HealthKitPermissions = {
    permissions: {
      read:[AppleHealthKit.Constants.Permissions.Steps ,AppleHealthKit.Constants.Permissions.FlightsClimbed, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning ],
      write:[],
    },
  }

  AppleHealthKit.isAvailable(()=>{});

  useEffect(()=>{
    AppleHealthKit.initHealthKit(permissions, (err)=>{
      if(err){
        console.log("error getting permi");
        return;
      }
      setPermi(true);
    });
  },[]);

  
  
  useEffect(()=>{
    if(!permi){
      return;
    }
    //date to fetch data
    const options : HealthInputOptions= {
      date: new Date(2023,5,24).toISOString(),
      includeManuallyAdded : false,
      //unit:HealthUnit.meter,
    }
    console.log(new Date())

    //fetch STEPS
    AppleHealthKit.getStepCount(options,(err,result) =>{
      if(err) {
        console.log("error getting response");
        return;
      }
      console.log(result.value);
      setSteps(result.value);
    });

    //fetch FLIGHTS CLIMBED
    AppleHealthKit.getFlightsClimbed(options,(err,result) =>{
      if(err) console.log("error getting response");

      console.log(result.value);
      setFlights(result.value);
    });

    //fetch DISTANCE
    AppleHealthKit.getDistanceWalkingRunning(options,(err,result) =>{
      if(err) console.log("error getting response");

      console.log(result.value);
      setDistance(result.value);
    });

  },[permi]);

return {
    steps,
    flights,
    distance,
}
};

export default useHealthData;
  