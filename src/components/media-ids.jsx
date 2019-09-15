import React, { Component } from "react";
import { PuiTextInput } from "@pui/react/components/basic-form-controls/text-input";
import { PuiButton } from "@pui/react/components/general/button";

export default class MediaIds extends Component {

  constructor(props) {
    super(props);
    this.state = { active: "RY7CKXBT" };
    this.sampleIds = ["RY7CKXBT", "G6xs45bv", "cIk6zff6", "Yb17Dt8e",	"jq1bYyWx", "lnPPQ2XP"];
  }

  toggleActive = (e) => {
    const active = e.target.innerHTML;
    this.setState({ active });
    this.props.toggleMediaId(active);
  }
  
  handleInput = (customId) => this.setState({ customId });

  handleSubmit = () => {
    const { customId } = this.state;
    if (!customId) { return };
    this.setState({ active: customId });
    this.props.fetchCustomId(customId);
  }

  render() {
    const { active, customId } = this.state;
    return (
      <div className="media-ids">
        <h3>Select Media:</h3>
        <PuiTextInput placeholder="Enter Media ID" value={customId} onValueChange={this.handleInput} />
        <PuiButton type="primary" onClick={this.handleSubmit}><span>Submit</span></PuiButton>
        <h3>Sample Media_IDs:</h3>
        { this.sampleIds.map((id, i) => <div key={i} className={`media-ids__id ${active === id ? '-is-active' : ''}`} onClick={this.toggleActive}>{id}</div>)}
      </div>
    )
  }
}
