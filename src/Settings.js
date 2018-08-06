import React, { PureComponent } from 'react';
import State from '@microstates/react';
import isEqual from 'lodash.isequal';

let parseIntWithDefault = v => v ? parseInt(v, 10) : 0;

export class Form {
  initial = Object
  flares = String
  knotsPerFlare = String

  initialize(initial) {
    return this
      .initial.set(initial)
      .flares.set(initial.flares)
      .knotsPerFlare.set(initial.knotsPerFlare);
  }

  setFlaresFromEvent(e) {
    return this.flares.set(e.target.value);
  }

  setKnotsPerFlareFromEvent(e) {
    return this.knotsPerFlare.set(e.target.value);
  }

  get serialized() {
    return {
      flares: parseIntWithDefault(this.flares.state),
      knotsPerFlare: parseIntWithDefault(this.knotsPerFlare.state)
    }
  }

  get isUnchanged() {
    return isEqual(this.serialized, this.initial.state);
  }
}

export default function Settings({ flares, knotsPerFlare, onSave }) {
  return (
    <State type={Form} value={{ flares, knotsPerFlare }}>
      {form => {
        return (
          <form onSubmit={e => {
            e.preventDefault();
            !form.isUnchanged && onSave(form.serialized);
          }}>

            <label>
              Number of flares <input type="number" onChange={form.setFlaresFromEvent} value={form.flares.state} />
            </label>

            <label>
              Knots per flare <input type="number" onChange={form.setKnotsPerFlareFromEvent} value={form.knotsPerFlare.state} />
            </label>       

            <button type="submit" disabled={form.isUnchanged}>Save</button>     
          </form>
        )
      }}
    </State>
  )
}