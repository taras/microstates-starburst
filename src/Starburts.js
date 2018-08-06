import React from 'react';

class Visualization {

}

export default function Starburst({ settings }) {
  return (
    <State type={Visualization}>
      {vis => {
        return (
          <svg viewBox="0 0 100 100">
            {null}
          </svg>
        );
      }}
    </State>
  )
}