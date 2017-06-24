import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesNormalBand } from 'react-sparklines';


export default (props) => {
  const color = props.color;
  return (
    <div>
      <Sparklines data={props.data} width={800} height={80}>
        <SparklinesLine style={{ stroke: color, strokeWidth: 4, fill: "none" }} />
        <SparklinesSpots size={7} spotColors={{ '-1': color, '0': color, '1': color }} />
      </Sparklines>
    </div>
  );
}
