import React from 'react';
const COVER_SIZE = 15;


export class CoverOption extends React.Component{

  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }
  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event);
  }
  handleMouseMove (event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }
  render () {
    let coverStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className={this.props.className}
           onMouseDown={this.handleMouseDown}
           onMouseEnter={this.handleMouseEnter}
           onMouseMove={this.handleMouseMove}
           title={this.props.option.title}>
        <image src={this.props.src} size={COVER_SIZE} style={coverStyle} />
        {this.props.children}
      </div>
    );
  }
}

export class CoverValue extends React.Component{

  render () {
    const coverStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<image src={this.props.value.src} size={COVER_SIZE} style={coverStyle} />
          {this.props.children}
				</span>
      </div>
    );
  }
}