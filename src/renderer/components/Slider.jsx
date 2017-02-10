import React from 'react';
import { Style } from 'radium';
import { isDevelopment } from '../utils';

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
    const { color, height, progress } = this.props;
    const { isDragging } = this.state;
    const padding = height / 2;

    return {
      '.seekbar': {
        height,
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: isDragging ? '-webkit-grabbing' : 'pointer',
      },
      '.seekbar .background': {
        backgroundColor: 'silver',
        position: 'absolute',
        height: height / 3,
        left: padding,
        right: padding,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        borderRadius: padding,
      },
      '.seekbar .foreground': {
        position: 'absolute',
        height: height / 3,
        left: padding,
        right: `calc(${100 - progress}% + ${(height / 100) * (progress - 50)}px)`,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        borderRadius: padding,
      },
      '.seekbar .thumb': {
        borderRadius: '50%',
        position: 'absolute',
        height,
        width: height,
        left: `calc(${progress}% - ${(progress / 100) * height}px)`,
        transition: isDragging ? 'none' : '0.25s ease-in-out',
        cursor: '-webkit-grab',
      },
      '.seekbar .thumb:active': {
        cursor: '-webkit-grabbing',
      },
      '.seekbar .hover': {
        backgroundColor: isDragging ? `rgb(${color.red}, ${color.blue}, ${color.green})` : 'grey',
      },
      '.seekbar:hover .hover': {
        backgroundColor: `rgb(${color.red}, ${color.blue}, ${color.green})`,
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
    const { offsetLeft, offsetWidth } = this.state;
    const padding = height / 2;
    const position = event.clientX - offsetLeft;
    const width = offsetWidth;

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
      <div className="seekbar" onMouseDown={this.handleMouseDown}>
        <div className="background" />
        <div className="foreground hover" />
        <div className="thumb hover" />
        <Style rules={this.getStyleRules()} />
      </div>
    );
  }
}

if (isDevelopment()) {
  Slider.propTypes = {
    color: React.PropTypes.shape({
      red: React.PropTypes.number,
      blue: React.PropTypes.number,
      green: React.PropTypes.number,
    }),
    height: React.PropTypes.number,
    onChange: React.PropTypes.func,
    progress: React.PropTypes.number.isRequired,
  };
}

Slider.defaultProps = {
  color: {
    red: 0,
    blue: 0,
    green: 0,
  },
  height: 12,
  onChange: () => {},
};

export default Slider;
