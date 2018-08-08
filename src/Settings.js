import React from 'react';

export class Settings {
  flares = String
  knotsPerFlare = String

  setFlaresFromEvent(e) {
    return this.flares.set(e.target.value);
  }

  setKnotsPerFlareFromEvent(e) {
    return this.knotsPerFlare.set(e.target.value);
  }
}

export default class SettingsForm extends React.PureComponent {
  render() {
    let { settings, onSubmit, hasChanges } = this.props;
    console.log('re-rendered pure component');
    return (
      <form onSubmit={onSubmit}>
        <label>
          Number of flares <input 
            type="number" 
            onChange={settings.setFlaresFromEvent} 
            value={settings.flares.state} 
          />
        </label>
  
        <label>
          Knots per flare <input 
            type="number" 
            onChange={settings.setKnotsPerFlareFromEvent} 
            value={settings.knotsPerFlare.state} 
          />
        </label>       
  
        <button type="submit" disabled={!hasChanges}>Save</button>     
      </form>
    )
  }

}