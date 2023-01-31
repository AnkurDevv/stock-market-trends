import classes from './InfoGraphic.module.css'
import React, { useRef, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


const  InfoGraphic = (props) =>{

const stockData = props.stockData.reverse();

 return (
   <div className={classes.lineChartWrapper}>
     <ResponsiveContainer width='100%' height={300}>
       <LineChart
         data={stockData}
         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
       >
         <XAxis dataKey='date' />
         <YAxis dataKey='price' />
         <Tooltip />
         <Line type='monotone' dataKey='price' stroke='#8884d8' />
       </LineChart>
     </ResponsiveContainer>
   </div>
 )
}

export default InfoGraphic;