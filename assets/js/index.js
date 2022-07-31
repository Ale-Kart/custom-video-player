const video = document.querySelector('.video-file'); // video tag
const btnPausePlay = document.querySelector('.video-playback-pause-play i'); // btn play & pause
const progressBar = document.querySelector('.video-progress-bar');
const videoTimeNow = document.querySelector('.video-time-now');
const videoTimeTotal = document.querySelector('.video-time-total');
const btnReturnVideo = document.querySelector('.bi-arrow-counterclockwise');
const btnAvancedVideo = document.querySelector('.bi-arrow-clockwise');
const btnVolumeVideo = document.querySelector('.video-volume i');
const volumeSlider = document.querySelector('#video-volume-input');
const btnPicInPic = document.querySelector('.video-pic i');
const videoTimeLabel = document.querySelector('.video-progress-label');
const containerVideoBar = document.querySelector('.video-progress');
const videoComponent = document.querySelector('.video');
const videoEffectIcon = document.querySelector('.video-effects i');
const videoEffects = document.querySelector('.video-effects');

window.onload = () => video.volume = 0.2;

const formatTime = (time) => {
	let seconds = Math.floor(time % 60),
		minutes = Math.floor(time / 60) % 60,
		hours = Math.floor(time / 3600);

	seconds = seconds < 10 ? `0${seconds}` : seconds;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	hours = hours < 10 ? `0${hours}` : hours;
	if (hours == 0) {
		return `${minutes}:${seconds} `;
	}
	return ` ${hours}:${minutes}:${seconds} `;
}

btnPausePlay.onclick = () => {
	// video.play();
	// btnPausePlay.classList.replace('bi-pause', 'bi-play');
	video.paused ? video.play() : video.pause();
};

video.onplay = () => {
	btnPausePlay.classList.replace('bi-play', 'bi-pause');
	videoEffects.setAttribute('data-effect', 'play');
	videoEffectIcon.classList.add('bi-play-fill');
	setTimeout(() => {
		videoEffects.removeAttribute('data-effect', 'play');
		videoEffectIcon.classList.remove('bi-play-fill');
	}, 300);
}
video.onpause = () => {
	btnPausePlay.classList.replace('bi-pause', 'bi-play');
	videoEffects.setAttribute('data-effect', 'pause');
	videoEffectIcon.classList.add('bi-pause-fill');
	setTimeout(() => {
		videoEffects.removeAttribute('data-effect', 'back');
		videoEffectIcon.classList.remove('bi-pause-fill');
	}, 300);
}

video.ontimeupdate = e => {
	let { currentTime, duration } = e.target;
	let time = (currentTime / duration) * 100;
	progressBar.style.width = `${time}%`;
	videoTimeNow.innerText = formatTime(currentTime);
	videoTimeLabel.innerText = formatTime(currentTime);
};

video.onloadeddata = e => {
	videoTimeTotal.innerText = formatTime(e.target.duration);
};

btnReturnVideo.onclick = () => {
	video.currentTime -= 5;
	videoEffects.setAttribute('data-effect', 'back');
	videoEffectIcon.classList.add('bi-skip-backward-fill');
	setTimeout(() => {
		videoEffects.removeAttribute('data-effect', 'back');
		videoEffectIcon.classList.remove('bi-skip-backward-fill');
	}, 300);
};

btnAvancedVideo.onclick = () => {
	video.currentTime += 5
	videoEffects.setAttribute('data-effect', 'avance');
	videoEffectIcon.classList.add('bi-skip-forward-fill');
	setTimeout(() => {
		videoEffects.removeAttribute('data-effect', 'avance');
		videoEffectIcon.classList.remove('bi-skip-forward-fill');
	}, 300);
};

btnVolumeVideo.onclick = () => {
	if (!btnVolumeVideo.classList.contains('bi-volume-up')) {
		video.volume = 0.5;
		btnVolumeVideo.classList.replace('bi-volume-mute', 'bi-volume-up');
	} else {
		video.volume = 0.0;
		btnVolumeVideo.classList.replace('bi-volume-up', 'bi-volume-mute');
	}
	volumeSlider.value = video.volume;
};

volumeSlider.oninput = (e) => {
	video.volume = e.target.value;
	e.target.value == 0 ?
		btnVolumeVideo.classList.replace('bi-volume-up', 'bi-volume-mute')
		: btnVolumeVideo.classList.replace('bi-volume-mute', 'bi-volume-up');
};

btnPicInPic.onclick = () => video.requestPictureInPicture();

containerVideoBar.onclick = (e) => {
	let timelineWidth = containerVideoBar.clientWidth;
	video.currentTime = (e.offsetX / timelineWidth) * video.duration;
};

containerVideoBar.onmousemove = e => {
	let offsetX = e.offsetX;
	videoTimeLabel.style.left = `${offsetX}px`;
	let timelineWidth = containerVideoBar.clientWidth;
	let percent = (e.offsetX / timelineWidth) * video.duration;
	videoTimeLabel.innerText = formatTime(percent);
};

videoComponent.onmouseover = () => {
	videoComponent.classList.add('show-controls');
}
videoComponent.onmouseleave = () => {
	videoComponent.classList.remove('show-controls');
}
// setTimeout(() => {
// 	videoComponent.classList.remove('show-controls');
// }, 2000)

// const insertEffectVideo = (typeEffect) => {
// 	const icon = document.querySelector('#video-effect-icon');
// 	if (typeEffect === 'avance') {
// 		icon.classList.add('bi-skip-forward-fill');
// 		console.log("alo");
// 	} else if (typeEffect === 'back') {
// 		icon.classList.add('bi-skip-backward-fill');
// 	}
// };
// insertEffectVideo('back');