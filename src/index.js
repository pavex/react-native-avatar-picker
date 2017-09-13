import React, {PropTypes} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, ToastAndroid, PixelRatio} from 'react-native';
import ImagePicker from 'react-native-image-picker';


/**
 */
export default class AvatarPicker extends React.Component {


//
	static propTypes = {
		label: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
		imageWidth: PropTypes.number,
		imageHeigh: PropTypes.number,
		borderColor: PropTypes.string,
		borderRadius: PropTypes.number,
		source: PropTypes.number,
		onSourceChange: PropTypes.func
	};





//
	static defaultProps = {
		label: 'Select a photo',
		width: 96,
		height: 96,
		imageWidth: 192,
		imageHeigh: 192,
		borderColor: 'rgba(0, 0, 0, .50)',
		borderRadius: 48
	};





//	
	state = {
		avatarSource: this.props.source
	};





//	
	componentWillReceiveProps(props) {
		if (props.source) {
			this.setState({avatarSource: props.source});
		}
	};





//
	_pressEvent() {
		let options = {
			title: this.props.label,
			quality: 1.0,
			maxWidth: this.props.imageWidth,
			maxHeight: this.props.imageHeight,
			storageOptions: {
				skipBackup: true
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				return;
			}
			if (response.error) {
				ToastAndroid.show(response.error, ToastAndroid.SHORT);
				return;
			}
//
			this.setState({
				avatarSource: {uri: response.uri}
			}, () => {
				if (this.props.onSourceChange) {
					this.props.onSourceChange.call(this);
				}
			});
		});
	};





//
	hasAvatar() {
		return this.state.avatarSource && this.state.avatarSource.uri;
	}





//
	getSource() {
		return this.state.avatarSource;
	}





//
	render() {
		let {width, height} = this.props;
//
		return (
			<TouchableOpacity onPress={this._pressEvent.bind(this)}>
				<View style={[this.styles.avatar, this.styles.container, {width, height}]}>
					{this.state.avatarSource === null
						? <Text style={this.styles.avatarText}>{this.props.label}</Text>
						: <Image style={[this.styles.avatar, {width, height}]} source={this.state.avatarSource} />
					}
				</View>
			</TouchableOpacity>
		);
	}





//
	styles = StyleSheet.create({
		container: {
			borderColor: this.props.borderColor,
			borderWidth: 1 / PixelRatio.get(),
			justifyContent: 'center',
			alignItems: 'center'
		},
		avatar: {
			borderRadius: this.props.borderRadius
		},
		avatarText: {
			fontSize: 12
		}
	});





};
