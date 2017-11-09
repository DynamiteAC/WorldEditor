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

    onClickAdd(event) {
        var newLandblock = {
            key : 458752,
            custom : {
                name : "new-land-block"
            },
            value : {
                weenies : [
                    {
                        id: 86766304,
                        pos: {
                            frame: {
                                angles: {
                                    w: 0,
                                    x: 0,
                                    y: 0,
                                    z: -1
                                },
                                origin: {
                                    x: 60,
                                    y: -85.245,
                                    z: 6
                                }
                            },
                            objcell_id: 2315387412
                        },
                        wcid: 15451,
                        custom: {
                            name: "test"
                        }
                    }
                ]
            }
        };
        this.props.worldspawn.landblocks.push(newLandblock);
        this.onUpdate();
    }

    onClickDelete(event) {
        this.props.worldspawn.landblocks.splice(event.target.id, 1);
        this.onUpdate();
    }

    render() {
        return (
            <div>
                <div className="LandBlocksList">
                    <div className="LandBlocksListHeader">LandBlocks</div>
                    <div style={{textAlign: "center", marginBottom: "5px"}}>
                        <LinkButton id="add" mainClassName="DeleteButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected"
                                    onClick={this.onClickAdd.bind(this)}>Add</LinkButton>
                    </div>
                    {this.props.worldspawn.landblocks.map((landblock,i) => {
                        console.log(landblock);
                        return (
                            <div key={i}>
                                <LinkButton id={i} style={{float: "left"}} mainClassName="DeleteButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected"
                                            onClick={this.onClickDelete.bind(this)}
                                    >Del</LinkButton>
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