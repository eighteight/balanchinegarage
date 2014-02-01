var dancer;
var dancerOT = false;


function initDancer(fl) {
	
	var AUDIO_FILE="";// = '',
	if(!fl){
		AUDIO_FILE = 'Assets/Songs/Santa-Esmeralda';	
	}else{
		AUDIO_FILE = fl;
	}
	//fft = document.getElementById( 'fft' ),
	//ctx = fft.getContext( '2d' ),
	var kick; 
	var ot = false;
	
	/*
	* Dancer.js magic
	*/
	Dancer.setOptions({
	flashSWF : 'Scripts/Dancer/soundmanager2.swf',
	flashJS  : 'Scripts/Dancer/soundmanager2.js'
	});
	
	dancer = new Dancer();
	kick = dancer.createKick({
		onKick: function () {
			doKick();
		},
		offKick: function () {
		
		}
	}).on();
	
	//var wireCD = false, floorCD = false, hueCD = false, skyCD = false;
	//260
	if(!fl){
		dancer.onceAt( 94, function () {
			setTimeout(function(){
				if(!dancerOT){
					initDrag();
					dancerOT = true
				}
			}, 3000);
			
		}).load({ src: AUDIO_FILE, codecs: [ 'mp3', 'ogg' ]});
	}else{
		dancer.load({ src: AUDIO_FILE});
	}
	Dancer.isSupported() || loaded();
	!dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();
	

	/*
	* Loading
	*/

	function loaded () {
		songLoaded = true;
		if(playerLoaded)
			initPlayButton();
	}
	
	// For debugging
	window.dancer = dancer;

}

function initPlayButton(){
	var loading = document.getElementById( 'info' ),
		anchor  = document.createElement('A'),
		supported = Dancer.isSupported(),
		p;
	
	
	anchor.appendChild( document.createTextNode( supported ? 'PLAY' : 'close' ) );
	anchor.setAttribute( 'href', '#' );
	loading.innerHTML = '<div onclick="startPlaying()">PLAY</div>';
	//loading.appendChild( anchor );
	
	
	if ( !supported ) {
		p = document.createElement('P');
		p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
		loading.appendChild( p );
	}
	
	
	loading.addEventListener( 'click', function () {
		dancer.play();
		//document.getElementById("bottomMiddle").style.display= "block";
		//document.getElementById("topMiddle").style.display= "block";

		//document.getElementById( 'load' ).style.display = "none";	
		playing = true;
		
	});	
}

function startPlaying(){
		dancer.play();
	//		document.getElementById("bottomMiddle").style.display= "block";
	//		document.getElementById("topMiddle").style.display= "block";
	//
	//		document.getElementById( 'load' ).style.display = "none";	
		playing = true;
}
