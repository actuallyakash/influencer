<?php

	// $host = "localhost";
	// $user = "root";
	// $pass = "";
	// $database = "influencer";

	// Hosting credentials
	$host = "localhost";
	$user = "brandingtree";
	$pass = "brandingtree1";
	$database = "influencer_extension";

	try{
		$conn = new PDO("mysql:host={$host};dbname={$database}",$user,$pass);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e)
	{
		echo $e->getMessage();
	}

?>