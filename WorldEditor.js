class WorldEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            worldspawn : null,
            selected: "loading",
            error: null
        };
    }

    componentDidMount(){
        fetch(WAMP_URL + "worldspawn.php")
            .then( response => response.json())
            .then( data => {
                if (data.landblocks) {
                    this.setState({
                        worldspawn: data,
                        selected : "worldspawn"
                    });
                }
            }).catch((error) => {
                this.setState({
                    selected : "error",
                    error : "Unable to load worldspawn.json: (" + error + ")"
                });
            });
    }

    onSaveClick() {
        console.log("Saving worldspawn.json");
        fetch(WAMP_URL + "worldspawn.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.worldspawn)
        });
    }

    onUpdate() {
        this.setState(prevState => prevState);
    }

    onMenuClick(event) {
        event.preventDefault();
        this.setState({"selected": event.target.id});
    }

    renderMainPanel() {
        switch (this.state.selected) {
            case "help":
                return ("Help page for useful links");
            case "loading":
                return ("Loading worldspawn file...");
            case "error":
                return (this.state.error);
            case "worldspawn":
                return (<WorldSpawnEditor worldspawn={this.state.worldspawn} onUpdate={this.onUpdate.bind(this)}/>);
        }
    }

    PageHeaderStyle = {"padding": "5px"};

    NavBarStyle = {
        "display": "inline-block",
        "marginTop": "5px",
        "marginBottom": "5px"
    };

    isSelected(id) {
        return this.state.selected === id;
    }

    isDisabled(id) {
        if (!this.state.worldspawn) {
            return true;
        }
        if (this.state.selected === id) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="PageHeader" style={this.PageHeaderStyle}>
                    PhatAC World Editor
                </div>
                <hr/>
                <div className="MenuBar">
                    <div className="ActionBar">
                        <LinkButton mainClassName="MenuButton" disabledClassName="LinkButtonDisabled"
                                    onClick={this.onSaveClick.bind(this)}>Save</LinkButton>
                    </div>
                    <div className="NavBar" style={this.NavBarStyle}>
                        <LinkButton id="worldspawn" disabled={this.isDisabled("worldspawn")} selected={this.isSelected("worldspawn")}
                                    mainClassName="MenuButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected"
                                    onClick={this.onMenuClick.bind(this)}>WorldSpawn</LinkButton>
                        <LinkButton id="help" disabled={this.isDisabled("help")} selected={this.isSelected("help")}
                                    mainClassName="MenuButton" disabledClassName="LinkButtonDisabled" selectedClassName="LinkButtonSelected"
                                    onClick={this.onMenuClick.bind(this)}>Help</LinkButton>
                    </div>
                </div>
                { this.renderMainPanel() }
            </div>
        );
    }
}