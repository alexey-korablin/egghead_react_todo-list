import React, {Component} from 'react';

export class Link extends Component {
    
    static contextTypes = {
        route: React.PropTypes.string,
        linkHandler: React.PropTypes.func
    }

    handleClick = (e) => {
        e.preventDefault();
        this.context.linkHandler(this.props.to);
        // history.pushState(null, '', this.props.to); // eslint-disable-line
    }


    render () {
        const activeClass = this.context.route === this.props.to ? 'activeItem' : '';
        return (
            <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
        )
    }
}

Link.propTypes = {
    to: React.PropTypes.string.isRequired
}