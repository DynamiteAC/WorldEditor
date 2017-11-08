class WorldSpawnLandBlockEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            selected : 0
        };
    }

    change(event){
        this.setState({selected: event.target.value});
    }

    onUpdate() {
        this.props.onUpdate();
    }

    updateValue(event, updateFunc) {
        updateFunc(event.target.value);
        this.setState(prevState => prevState);
        this.onUpdate();
    }

    updateNumValue(event, updateFunc) {
        var val = event.target.value;
        if (typeof val === 'string') {
            val = parseInt(val);
        }
        updateFunc(val);
        this.setState(prevState => prevState);
        this.onUpdate();
    }

    genPositionString() {
        var landblock = this.props.landblock;
        var weenies = landblock.value.weenies;
        var selectedWeenie = weenies[this.state.selected];
        var positionString = selectedWeenie.pos.objcell_id.toString(16) + " "
                           + selectedWeenie.pos.frame.origin.x + " "
                           + selectedWeenie.pos.frame.origin.y + " "
                           + selectedWeenie.pos.frame.origin.z + " "
                           + selectedWeenie.pos.frame.angles.w + " "
                           + selectedWeenie.pos.frame.angles.x + " "
                           + selectedWeenie.pos.frame.angles.y + " "
                           + selectedWeenie.pos.frame.angles.z;
        return positionString;
    }

    positionStringChanged(event) {
        var landblock = this.props.landblock;
        var weenies = landblock.value.weenies;
        var selectedWeenie = weenies[this.state.selected];
        var pieces = event.target.value.split(" ");
        selectedWeenie.pos.objcell_id = parseInt(pieces[0], 16);
        selectedWeenie.pos.frame.origin.x = pieces[1];
        selectedWeenie.pos.frame.origin.y = pieces[2];
        selectedWeenie.pos.frame.origin.z = pieces[3];
        selectedWeenie.pos.frame.angles.w = pieces[4];
        selectedWeenie.pos.frame.angles.x = pieces[5];
        selectedWeenie.pos.frame.angles.y = pieces[6];
        selectedWeenie.pos.frame.angles.z = pieces[7];
        this.setState(prevState => prevState);
    }

    render() {
        var landblock = this.props.landblock;
        var weenies = landblock.value.weenies;
        var selectedWeenie = weenies[this.state.selected];

        // Create name if it doesn't have one already.
        getOrCreate(landblock, "custom.name", landblock.key);

        return (
            <div className="worldspawn-landblock-editor">

                <div className="worldspawn-landblock-editor-group">
                    <label>Landblock Name:</label>
                    <input title="The landblock name is used only by the WorldEditor for easier searching."
                           className="LandBlockEditInput" name="custom.name" value={landblock.custom.name}
                           onChange={event => this.updateValue(event, v => landblock.custom.name = v)}/>
                </div>
                <div className="worldspawn-landblock-editor-group">
                    <label>Landblock Key:</label>
                    <input title="The landblock key is the landblock (in decimal format) that needs to be loaded for this set of weenies to be activated."
                           className="LandBlockEditInput" name="key" value={landblock.key}
                           onChange={event => this.updateNumValue(event, v => landblock.key = v)}/>
                </div>
                <hr />

                <div className="worldspawn-landblock-editor-group">
                    <label>Select a Weenie:</label>
                    <select className="LandBlockEditInput" onChange={this.change.bind(this)} value={this.state.selected}>
                        {weenies.map((weenie, i) => {
                            getOrCreate(weenie, "custom.name", weenie.id);
                            var text;
                            if (weenie.id === weenie.custom.name) {
                                text = weenie.id;
                            } else {
                                text = weenie.id + " (" + weenie.custom.name + ")";
                            }
                            return (<option key={i} value={i}>{text}</option>);
                        })}
                    </select>
                </div>
                <hr />

                <h2>Weenie:</h2>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Weenie Name:</label>
                        <input className="LandBlockEditInput" name="name"  value={selectedWeenie.custom.name} onChange={event => this.updateValue(event, v => selectedWeenie.custom.name = v)}/>
                    </div>
                </div>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>ID:</label>
                        <input className="LandBlockEditInput" name="id"  value={selectedWeenie.id} onChange={event => this.updateValue(event, v => selectedWeenie.id = v)}/>
                    </div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>WCID:</label>
                        <input className="LandBlockEditInput" name="wcid" value={selectedWeenie.wcid} onChange={event => this.updateNumValue(event, v => selectedWeenie.wcid = v)}/>
                    </div>
                </div>
                <hr />

                <h2>Position</h2>
                <div className="worldspawn-landblock-editor-group">
                    <label>LOC String:</label>
                    <input name="loc_string" size="85" style={{width: "520px"}} value={this.genPositionString()} onChange={this.positionStringChanged.bind(this)}/>
                </div>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Angle W:</label>
                        <input name="pos.frame.angles.w" value={selectedWeenie.pos.frame.angles.w}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.angles.w = v)}/>
                    </div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Origin X:</label>
                        <input name="pos.frame.origin.x" value={selectedWeenie.pos.frame.origin.x}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.origin.x = v)}/>
                    </div>
                </div>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Angle X:</label>
                        <input name="pos.frame.angles.x" value={selectedWeenie.pos.frame.angles.x}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.angles.x = v)}/>
                    </div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Origin Y:</label>
                        <input name="pos.frame.origin.y" value={selectedWeenie.pos.frame.origin.y}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.origin.y = v)}/>
                    </div>
                </div>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Angle Y:</label>
                        <input name="pos.frame.angles.y" value={selectedWeenie.pos.frame.angles.y}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.angles.y = v)}/>
                    </div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Origin Z:</label>
                        <input name="pos.frame.origin.z" value={selectedWeenie.pos.frame.origin.z}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.origin.z = v)}/>
                    </div>
                </div>
                <div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>Angle Z:</label>
                        <input name="pos.frame.angles.z" value={selectedWeenie.pos.frame.angles.z}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.frame.angles.z = v)}/>
                    </div>
                    <div className="worldspawn-landblock-editor-group">
                        <label>ObjCellId:</label>
                        <input name="pos.objcell_id" value={selectedWeenie.pos.objcell_id}
                               onChange={event => this.updateNumValue(event, v => selectedWeenie.pos.objcell_id = v)}/>
                    </div>
                </div>
            </div>
        );
    }
}
