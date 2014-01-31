

var FaceScale = function(OBJ, AXIS, WIDTH, SPEED){
	
	this.axis = AXIS;
	this.width = WIDTH;
	this.obj = OBJ;
	this.speed = SPEED;
	this.geo = this.obj.geometry;
	this.fvNames = [ 'a', 'b', 'c', 'd' ];
	this.positions = [];
	this.ax = AXIS;
	this.axis = [];
	this.directions = [];
	this.averages = [];
	this.phase = 0.0;
	this.ot = false;
	this.vertIndex = 0;
	this.vertCount = 0;
	this.ot = false;
	
	this.init = function(){
		
		for( var i = 0; i < this.geo.faces.length; i ++ ) {
			
			var face = this.geo.faces[i];		
			var dr = [];
			var og = [];
			var ax = [];
			var avg = new THREE.Vector3(0,0,0);
				
			for(var k = 0; k<face.vertexNormals.length; k++){
				this.vertCount++;
				og[k] = new THREE.Vector3(this.geo.vertices[face[this.fvNames[k]]].x, this.geo.vertices[face[this.fvNames[k]]].y, this.geo.vertices[face[this.fvNames[k]]].z);
				avg.x += og[k].x;
				avg.y += og[k].y;
				avg.z += og[k].z;
				switch(this.ax){
					case "x":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].x*this.width);
					break;	
					case "y":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].y*this.width);
					break;	
					case "z":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].z*this.width);
					break;
					case "xy":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].x*this.geo.vertices[face[this.fvNames[k]]].y*this.width);
					break;
					case "xz":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].x*this.geo.vertices[face[this.fvNames[k]]].z*this.width);
					break;
					case "yz":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].y*this.geo.vertices[face[this.fvNames[k]]].z*this.width);
					break;	
					case "xyz":
						ax[k] =  (this.geo.vertices[face[this.fvNames[k]]].y*this.geo.vertices[face[this.fvNames[k]]].x*this.geo.vertices[face[this.fvNames[k]]].z*this.width);
					break;	
						
				}
			}
			
			this.positions[i] = og;
			
			this.axis[i] = ax;	
			
			avg.x = avg.x/og.length;
			avg.y = avg.y/og.length;
			avg.z = avg.z/og.length;
			
			for(var k = 0; k < og.length; k++){
				dr[k] = new THREE.Vector3(og[k].x-avg.x, og[k].y-avg.y, og[k].z-avg.z);	
			}
			
			this.directions[i]  = dr;
			
			
			this.averages[i] = avg;
				
		}
		
	}
	
	
	
	this.resetFaces = function(){
		
		for( var i = 0; i < this.geo.faces.length; i ++ ) {
				
			var face = this.geo.faces[i];
		
			var og = this.positions[i];
			
			for(var k = 0; k<face.vertexNormals.length; k++){
				var thisVert = this.geo.vertices[face[this.fvNames[k]]];
				
				thisVert.x = og[k].x;
			
				thisVert.y = og[k].y;
				
				thisVert.z = og[k].z;
				
			}
			
		}
		
		this.obj.geometry.verticesNeedUpdate = true;
			
	}
	
	
	
	
	
	this.animate = function(SCL){
		
		for( var i = 0; i < this.geo.faces.length; i ++ ) {
				
			var face = this.geo.faces[i];
		
			var dr = this.directions[i];
			var og = this.positions[i];
			var ax = this.axis[i];
			var dd = i;
			if(dd>SCL.length)dd = SCL.length
			var sc = SCL[dd]*5;
			if(sc<0.01)sc=0.01;
			
			
			for(var k = 0; k<face.vertexNormals.length; k++){
				var thisVert = this.geo.vertices[face[this.fvNames[k]]];
				if(!sc){
					var vertPhase = Math.sin(this.phase + ax[k]);
					if(vertPhase>0.0)vertPhase=0.0; 
			
					thisVert.x = og[k].x + (vertPhase) * dr[k].x;
			
					thisVert.y = og[k].y + (vertPhase) * dr[k].y;
				
					thisVert.z = og[k].z + (vertPhase) * dr[k].z;
				}else{
					
					var vertPhase = sc;
					//if(vertPhase>0.0)vertPhase=0.0; 
					//if(vertPhase<-.0)vertPhase=-1.0; 
					
					thisVert.x = og[k].x + (vertPhase) * dr[k].x;
			
					thisVert.y = og[k].y + (vertPhase) * dr[k].y;
				
					thisVert.z = og[k].z + (vertPhase) * dr[k].z;
				}
	
			}
			
		}
		
		this.phase+=this.speed;
		
		this.obj.geometry.verticesNeedUpdate = true;
			
	}
}


