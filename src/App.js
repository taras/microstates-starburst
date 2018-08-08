import React, { Fragment } from "react";
import State from "@microstates/react";
import SettingsForm, { Settings } from "./Settings";
import { create } from "microstates";

import isEqual from "lodash.isequal";
let parseIntWithDefault = v => (v ? parseInt(v, 10) : 0);

class Model {
  flares = create(Number, 10);
  knotsPerFlare = create(Number, 5);
  settings = Settings;
  isVisible = Boolean;

  initialize() {
    return this.copySettings();
  }

  copySettings() {
    return this.settings.set({
      flares: `${this.flares.state}`,
      knotsPerFlare: `${this.knotsPerFlare.state}`
    });
  }

  attemptPersistSettingsOnSubmit(e) {
    e.preventDefault();

    if (this.settingsHaveChanges) {
      let { serializedSettings } = this;

      return this.flares
        .set(serializedSettings.flares)
        .knotsPerFlare.set(serializedSettings.knotsPerFlare)
        .copySettings();
    }

    return this;
  }

  get settingsHaveChanges() {
    let { flares, knotsPerFlare } = this.state;

    return !isEqual({ flares, knotsPerFlare }, this.serializedSettings);
  }

  get serializedSettings() {
    return {
      flares: parseIntWithDefault(this.settings.flares.state),
      knotsPerFlare: parseIntWithDefault(this.settings.knotsPerFlare.state)
    };
  }
}

export default function App() {
  return (
    <State type={Model}>
      {app => {
        return (
          <Fragment>
            <SettingsForm
              settings={app.settings}
              onSubmit={app.attemptPersistSettingsOnSubmit}
              hasChanges={app.settingsHaveChanges}
            />
            <button onClick={app.isVisible.toggle}>
              Toggle {app.isVisible.state ? "yes" : "no"}
            </button>
          </Fragment>
        );
      }}
    </State>
  );
}
