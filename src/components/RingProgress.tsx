import { View } from 'react-native'
import Svg, { Circle, CircleProps } from 'react-native-svg';
import {useEffect} from 'react';
import Animated ,{ useAnimatedProps,useSharedValue,withTiming} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons'; 

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ringProp = {
    radius ?: number,
    strokeWidth ?: number,
    progress : number,
};

const color= "#EE0F55";


const RingProgress = ( {radius=100 , strokeWidth=35 , progress} : ringProp) => {
    const innerRad = radius - strokeWidth/2;
    const circum = 2*Math.PI*innerRad;

    const circleProps : CircleProps ={
        cx:radius,
        cy:radius, 
        r:innerRad,
        strokeWidth:strokeWidth,
        stroke:color, 
        strokeLinecap:'round',
        origin:radius,
        rotation:-90,
    }

    const fill=useSharedValue(0);

    useEffect(()=>{
        fill.value=withTiming(progress ,{duration:1000});
    },[progress])

    const animatedProps=useAnimatedProps(()=>({
        strokeDasharray: [circum * fill.value,circum],
    }))

  return (
    <View style= {{width: radius*2, height:radius*2,alignSelf:'center'}}>
      <Svg>
        <Circle {...circleProps} opacity={0.2} />
        <AnimatedCircle {...circleProps} animatedProps={animatedProps} />
      </Svg>
      <AntDesign name="arrowright" style={{position:'absolute',alignSelf:'center',top:strokeWidth*0.1}} size={strokeWidth*0.8} color="black" />
    </View>
  )
}

export default RingProgress