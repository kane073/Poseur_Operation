<?php

if (isset($_POST['configuration'])) {
    $configuration = $_POST['configuration'];
	$data = "var donnees_json = '".$configuration."';";
    $fp = fopen('config2.js', 'w');
    fwrite($fp, $data);
    fclose($fp);
    $reponse = array("reponse" => "success");
    echo json_encode($reponse);
} else {
    $reponse = array("reponse" => "error");
    echo json_encode($reponse);
}

?>