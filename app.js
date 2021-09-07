const app =() => {
	const song=document.querySelector(".sound");
	const play=document.querySelector(".play");
	const outline=document.querySelector(".moving_outline circle");
	const video=document.querySelector(".vid_container video");

	//sounds
	const sounds=document.querySelectorAll(".sound_picker button");
	//time display
	const timeDisplay=document.querySelector(".time_display");
	const timeSelect=document.querySelectorAll(".time_select button")
	//get the lenght of the outline
	const outlineLenght = 1359.759765625;
	//duration
	let fakeDuration=120;

	outline.style.strokeDasharray = outlineLenght;
	outline.style.strokeDashoffset = outlineLenght;

	//pick different song
	sounds.forEach(sound=>{
		sound.addEventListener('click',function(){
			song.src=this.getAttribute('data-sound');
			video.src=this.getAttribute('data-video');
			checkPlaying(song);
		});
	});

	//playsong
	play.addEventListener('click',()=>{
		checkPlaying(song);
	});

	//time select button
	timeSelect.forEach(option=>{
		option.addEventListener('click',function(){
			fakeDuration=this.getAttribute('data-time');
			timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
		});
	});


	//function to check if the song is paused or played
	const checkPlaying = song =>{
		if(song.paused){
			song.play();
			video.play();
			play.src='./svg/pause.svg';
		}else{
			song.pause();
			video.pause();
			play.src='./svg/play.svg';
		}
	};

	//to animate the circle
	song.ontimeupdate = () =>{
		let currentTime=song.currentTime;
		let elapsedTime=fakeDuration-currentTime;
		let seconds=Math.floor(elapsedTime % 60);
		let minutes=Math.floor(elapsedTime / 60);

		//Animate circle
		let progress= outlineLenght-(currentTime/fakeDuration)*outlineLenght;
		outline.style.strokeDashoffset=progress;
		//animate text
		timeDisplay.textContent=`${minutes}:${seconds}`;

		if(currentTime >=fakeDuration){
			song.pause();
			currentTime=0;
			play.svg='./svg/play.svg';
			video.pause();
		}

	};

};

app();