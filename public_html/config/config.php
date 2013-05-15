<?php

if (isset($_POST['configuration'])) {
    $configuration = $_POST['configuration'];
    $fp = fopen('config.json', 'w');
    fwrite($fp, $configuration);
    fclose($fp);
    $reponse = array("reponse" => "success");
    echo json_encode($reponse);
} else {
    $reponse = array("reponse" => "error");
    echo json_encode($reponse);
}