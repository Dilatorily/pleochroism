import React from 'react';
import { Style } from 'radium';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      offsetLeft: 0,
      offsetWidth: 0,
    };
  }

  getStyleRules = () => {
    const { activeColor, backgroundColor, foregroundColor, height, progress } = this.props;
    const { isDragging } = this.state;
    const padding = height / 2;

    return {
      '.slider': {
        height,
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: isDragging ? '-webkit-grabbing' : 'pointer',
      },
      '.slider .background': {
        backgroundColor,
        position: 'absolute',
        height: height / 3,
        left: padding,
        right: padding,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        borderRadius: padding,
      },
      '.slider .foreground': {
        position: 'absolute',
        height: height / 3,
        left: padding,
        right: `calc(${100 - progress}% + ${(height / 100) * (progress - 50)}px)`,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        borderRadius: padding,
      },
      '.slider .thumb': {
        borderRadius: '50%',
        position: 'absolute',
        height,
        width: height,
        left: `calc(${progress}% - ${(progress / 100) * height}px)`,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        cursor: '-webkit-grab',
      },
      '.slider .thumb:active': {
        cursor: '-webkit-grabbing',
      },
      '.slider .hover': {
        backgroundColor: isDragging ? activeColor : foregroundColor,
      },
      '.slider:hover .hover': {
        backgroundColor: activeColor,
      },
    };
  };

  handleMouseDown = (event) => {
    document.addEventListener('mousemove', this.handleChange);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.setState({
      isDragging: true,
      offsetLeft: event.currentTarget.offsetLeft,
      offsetWidth: event.currentTarget.offsetWidth,
    });

    return this.handleChange(event);
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleChange);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.setState({ isDragging: false });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { onChange, height } = this.props;
    const { isDragging, offsetLeft, offsetWidth } = this.state;
    const padding = height / 2;
    const position = event.clientX - (isDragging ? offsetLeft : event.currentTarget.offsetLeft);
    const width = isDragging ? offsetWidth : event.currentTarget.offsetWidth;

    if (position <= padding) {
      return onChange(0);
    }

    if (position >= width - padding) {
      return onChange(100);
    }

    return onChange(((position - padding) / (width - (2 * padding))) * 100);
  }

  render() {
    return (
      <div className="slider" onMouseDown={this.handleMouseDown}>
        <div className="background" />
        <div className="foreground hover" />
        <div className="thumb hover" />
        <Style rules={this.getStyleRules()} />
      </div>
    );
  }
}

Slider.propTypes = {
  activeColor: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  foregroundColor: React.PropTypes.string,
  height: React.PropTypes.number,
  onChange: React.PropTypes.func,
  progress: React.PropTypes.number.isRequired,
};

Slider.defaultProps = {
  activeColor: 'black',
  backgroundColor: 'silver',
  foregroundColor: 'grey',
  height: 12,
  onChange: () => {},
};

export default Slider;
