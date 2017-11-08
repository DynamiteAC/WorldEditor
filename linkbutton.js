const LinkStyle = {
    "display": "inline-block",
    "borderWidth": "1px",
    "borderRadius": "5px",
    "textDecoration": "none"
};

const LinkActiveStyle = {
    "borderStyle": "inset"
};

const LinkInActiveStyle = {
    "borderStyle": "outset"
};

const LinkDisabledStyle = {
    "pointerEvents": "none"
};

class LinkButton extends React.Component {
    constructor() {
        super();
        this.state = {active : false};
    }

    buttonStyle() {
        var css = Object.assign({}, LinkStyle);
        if (this.props.disabled) {
            Object.assign(css, LinkDisabledStyle);
            if (this.props.selected) {
                Object.assign(css, LinkActiveStyle);
            }
        } else {
            if (this.state.active || this.props.selected) {
                Object.assign(css, LinkActiveStyle);
            } else {
                Object.assign(css, LinkInActiveStyle)
            }
        }
        if (this.props.style) {
            Object.assign(css, this.props.style);
        }
        return css;
    }

    buttonClassName() {
        var classes = [];
        if (this.props.mainClassName) {
            classes.push(this.props.mainClassName);
        }
        if (this.props.disabledClassName && this.props.disabled) {
            classes.push(this.props.disabledClassName);
        }
        if (this.props.selectedClassName && this.props.selected) {
            classes.push(this.props.selectedClassName);
        }
        return classes.join(" ");
    }

    render() {
        return (
            <a href="#" id={this.props.id} className={this.buttonClassName()} style={this.buttonStyle()}
               onMouseEnter={e=>this.setState({active : true})}
               onMouseLeave={e=>this.setState({active : false})}
               onClick={this.props.onClick.bind(this)}>{this.props.children}</a>
        );
    }
}

LinkButton.defaultProps = {
    disabled: false,
    selected: false,
    onClick: Function.prototype
};

LinkButton.propTypes = {
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    mainClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    selectedClassName: PropTypes.string
};