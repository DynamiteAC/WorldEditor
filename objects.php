<?php
  include_once("settings.php");
  $WORLDSPAWN = PHATAC_JSON_LOCATION . "\worldspawns.json";

function getWeenieFileNames() {
  return array_slice(scandir(PHATAC_JSON_LOCATION . "\weenies"),2);
}
?>

<html>
  <head>
  </head>
  <body>
    <?php include("navbar.php") ?>
    <div class="main">
      <p>Loading Weenies</p>
      <p><?php print_r(getWeenieFileNames());?></p>
    </div>
  </body>
</html>