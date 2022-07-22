import { Line } from 'rc-progress';

export default function ProgressComponent({persen}){
  return(
    <Line trailWidth={3} percent={persen} strokeWidth={3} strokeColor={"#34d99f"}/>
  )
}