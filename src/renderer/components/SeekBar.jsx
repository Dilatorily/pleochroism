import React from 'react';
import { connect } from 'react-redux';

import Slider from './Slider';
import { changeSeekbar } from '../reducers/seekbar';

const mapStateToProps = state => ({
  progress: state.seekbar.progress,
});

const mapDispatchToProps = dispatch => ({
  updateSeekbar: progress => dispatch(changeSeekbar(progress)),
});

const SeekBar = ({ progress, updateSeekbar }) => (
  <Slider progress={progress} onChange={updateSeekbar} />
);

SeekBar.propTypes = {
  progress: React.PropTypes.number.isRequired,
  updateSeekbar: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeekBar);
