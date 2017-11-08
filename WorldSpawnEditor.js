class WorldSpawnEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 0
        };
    }

    onUpdate() {
        this.props.onUpdate();
    }

    cssLandBlocksListItem(i) {
        var classes = "LandBlocksListItem";
        if (this.state.selected == i) {
            classes = classes + " selected";
        }
        return classes;
    }

    splitCssClasses(cssClasses){
        return cssClasses.split(" ").filter(cls => cls !== "");
    }

    cssMouseDown(event) {
        var classes = this.splitCssClasses(event.target.className);
        if (classes.indexOf("mousedown") == -1) {
            classes.push("mousedown");
        }
        classes = classes.join(" ");
        event.target.className = classes;
    }

    cssMouseUp(event) {
        var classes = this.splitCssClasses(event.target.className);
        if (classes.indexOf("mousedown") >= 0) {
            classes = classes.filter(cls => cls !== "mousedown");
        }
        classes = classes.join(" ");
        event.target.className = classes;
    }

    render() {
        return (
            <div>
                <div className="LandBlocksList">
                    <div className="LandBlocksListHeader">LandBlocks</div>
                    <div style={{textAlign: "center", marginBottom: "5px"}}>
                        <LinkButton id="add" mainClassName="DeleteButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected">Add</LinkButton>
                    </div>
                    {this.props.worldspawn.landblocks.map((landblock,i) => {
                        return (
                            <div key={i}>
                                <LinkButton id="delete" style={{float: "left"}} mainClassName="DeleteButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected">Del</LinkButton>
                                <div className={this.cssLandBlocksListItem(i)}>
                                    <a href="#" id={i} onClick={event => {
                                        event.preventDefault();
                                        this.setState({"selected":event.target.id});
                                    }}>{getOrCreate(landblock, "custom.name", landblock.key)}</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div style={{marginLeft: "135px", paddingTop: "5px", height: "100%"}}>
                    { this.props.worldspawn.landblocks && this.props.worldspawn.landblocks.length > 0 ?
                        <WorldSpawnLandBlockEditor landblock={this.props.worldspawn.landblocks[this.state.selected]} onUpdate={this.onUpdate.bind(this)} /> : ""
                    }
                </div>
            </div>
        );
    }
}