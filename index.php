<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Face Verification System</title>
	<link href="Site.css" rel="stylesheet" type="text/css" />
	<link href="bootstrap-superhero.min.css" rel="stylesheet" type="text/css" />
	<script src="jquery-3.1.1.min.js"></script>
	<script src="bootstrap.min.js"></script>
	<script src="webcam.js"></script>
	<script src="modernizr-2.8.3.js"></script>
</head>
<body>
	<div class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="test.html" class="navbar-brand">Face Verification System</a>
			</div>
			<div class="navbar-collapse collapse">
				<ul class="nav navbar-nav"></ul>
			</div>
		</div>
	</div>

	<div class="container body-content">
	<input class="form-control" id="pin" type="text" placeholder="Enter Your Identification Number">
		<div class="webcam-area container-fluid form-group">
			<video id="webcam" height="400px" width="100%" align="center" style="background-color:black;" ></video>
			
			<img src="https://placekitten.com/400/300" id="photo" style="float:right;display:none;" alt="my Login Image" />
			<button class="btn btn-success btn-block" id="capture">Login</button>
			<canvas style="display:none;" id="canvas" height="300" width="400"></canvas>
		</div>
		
		<hr />
		<footer>
			<p>&copy; 2016 - Face Verification System</p>
		</footer>
	</div>

</body>
</html>