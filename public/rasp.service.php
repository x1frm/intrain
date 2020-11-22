<?php
    // $apikey = '';
    $query = $_SERVER['QUERY_STRING'];
    $action = $_GET['mp-action'];
    $json = file_get_contents("https://api.rasp.yandex.net/v3.0/{$action}/?{$query}&apikey={$apikey}");
    header('Content-type: application/json');
    echo $json;
?>
