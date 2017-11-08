<?php
  include_once("settings.php");
  $WORLDSPAWN = PHATAC_JSON_LOCATION . "\worldspawns.json";

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $rawData = $HTTP_RAW_POST_DATA;
      $jsonDecoded = json_decode($rawData);

      $prettyPrintedJson = json_encode($jsonDecoded, JSON_PRETTY_PRINT);
      $prettyPrintedJson = str_replace("\r\n", "\n", $prettyPrintedJson);
      $prettyPrintedJson = str_replace("\r", "\n", $prettyPrintedJson);
      $prettyPrintedJson = str_replace("\n", "\r\n", $prettyPrintedJson);

      copy($WORLDSPAWN, $WORLDSPAWN . "." . time());
      file_put_contents ( $WORLDSPAWN , $prettyPrintedJson );
  } else {
    $rawFile = file_get_contents($WORLDSPAWN);

    $decoded = json_decode($rawFile);
    $encoded = json_encode($decoded, JSON_PRETTY_PRINT);
    echo $encoded;
  }

?>