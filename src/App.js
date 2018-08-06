import React, { Fragment } from "react";
import State from '@microstates/react';
import SettingsForm from "./Settings";
import { create } from 'microstates';

class Model {
  flares = create(Number, 10)
  knotsPerFlare = create(Number, 5)

  updateSettings({ flares, knotsPerFlare }) {
    console.log(flares, knotsPerFlare);
    return this
      .flares.set(flares)
      .knotsPerFlare.set(knotsPerFlare);
  }
}

let value = {
  flares: 10,
  knotsPerFlare: 5
};

export default function App() {
  return (
    <State type={Model} value={value}>
      {app => (
        <Fragment>
          <SettingsForm 
            flares={app.flares.state}
            knotsPerFlare={app.knotsPerFlare.state} 
            onSave={app.updateSettings}
          />
        </Fragment>
      )}
    </State>
  );
}
