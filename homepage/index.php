<?php
    include_once 'core/init.php';
    error_reporting(0);

    $reference = $_REQUEST['ref'];

    try
    {
        if($reference)
        {
            $sql = $conn->prepare("Select * from visitors where reference=?");
            $sql->execute(array($reference));
            $results = $sql->fetch(PDO::FETCH_ASSOC);

            if($results)
            {
                $sql = $conn->prepare("UPDATE visitors SET times_visited=times_visited+1 WHERE reference=?");
                $sql->execute(array($reference));
            }
            else
            {
                $sql = "INSERT INTO visitors(reference,times_visited,created_at) VALUES(?,?,NOW())";
                $query = $conn->prepare($sql);
                $query->execute(array($reference,1));
            }
        }
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
		<script src="assets/js/analytics.js" type="text/javascript"></script>
        <!-- Meta -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Title -->
        <title>Influencer - Kick-Ass Way To Block Distractions</title>
        <meta name="description" content="Helps you to block websites which distract you from your goals by showing a kick-ass quote at the right time to get you back on track.">

        <!-- Twitter -->
        <meta name="twitter:card" content="assets/images/graphics/large.png">
        <meta name="twitter:site" content="">
        <meta name="twitter:title" content="Influencer">
        <meta name="twitter:description" content="Helps you to block websites which distract you from your goals by showing a kick-ass quote at the right time to get you back on track.">
        <meta name="twitter:image" content="assets/images/graphics/icon.png">

        <!-- Facebook -->
       <meta property="og:title" content="Influencer" />
       <meta property="og:description" content="Helps you to block websites which distract you from your goals by showing a kick-ass quote at the right time to get you back on track." />
       <meta property="og:image" content="assets/images/graphics/large.png" />
       <meta property="og:type" content="website" />


        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="assets/images/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="assets/images/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/images/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="assets/images/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/images/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="assets/images/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="assets/images/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="assets/images/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="assets/images/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="assets/images/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon/favicon-16x16.png">
        <!-- Logo -->
        <link href="assets/images/icon.png" rel="shortcut icon" type="image/x-icon">
        <!-- Fonts From Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Bangers" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Comfortaa|Fredoka+One" rel="stylesheet">

		<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/dfgpeekcneclmfdalhopgneoaedfkfbl">

		<!-- Font-Awesome -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

        <!-- Bootstrap -->
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <!-- Main css -->
        <link rel="stylesheet" href="assets/css/style.css">
        <!-- Responsive css -->
        <link rel="stylesheet" href="assets/css/responsive.css">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->

        <!--[if lt IE 9]>

            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>

        <![endif]-->

    </head>

<body>
    <div class="loader-wrapper"></div>

    <div id="into" class="into">
		<div class="container-fluid">
			<!-- Left Section -->
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 right-intro">
				<div class="box-right-intro">
					<img class="logo" src="assets/images/icon.png" alt="Influencer">
					<h2>Influencer</h2>
					<h4>Handle Distractions Like A Boss</h4>
					<hr class="line-title">					
					<p>
						Helps you to block websites which distract you from your goals by showing a kick-ass quote at the right time to get you back on track.
					</p>
					<br>

					<div class="" id="extension-button">
						
					</div>
					
					<div class="spacing"></div>
					<div class="text-center">
						<p>Available On</p>
						<a target="_blank" href="https://chrome.google.com/webstore/detail/influencer/dfgpeekcneclmfdalhopgneoaedfkfbl" class="custom-btn btn-inf-inverse"><i class="fab fa-chrome"></i></a>

						<a target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/influencer/" class="custom-btn btn-inf-inverse"><i class="fab fa-firefox"></i></a>
					</div>

					<div class="text-center">
						<p class="credits">Icon made by Freepik from www.flaticon.com </p>
                        <a href="privacy/" class="privacy">Privacy</a>
					</div>
				</div>
			</div>

			<!-- Right Section -->
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 left-intro">
				<div class="box-left-intro">
					<!-- https://source.unsplash.com/800x600/?quotes -->
					<img src="https://source.unsplash.com/collection/2335089" class="img-responsive" alt="Quote">
				</div>
			</div>			

		</div>
    </div>

    <!-- jQuery -->
    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <!-- Bootstrap -->
    <script src="assets/js/bootstrap.js"></script>
    <!-- Main -->
    <script src="assets/js/main.js"></script>

</body>
</html>
