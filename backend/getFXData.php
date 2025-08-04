<?php

if (empty($_REQUEST["case01"]))
{
  echo "Your favorite color is rrrtyuiuytyued!<br>";
  //header('Location: tester.html');
  exit; 
} 

// get the q parameter from URL
require_once 'pdoconfig.php';



$chosen_case = $_REQUEST["case01"];
$conn = mysqli_connect("serverName", "userName", "password", "database");
$output = "";


if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
}


switch ($chosen_case) {
    case "1":
        $str = $_REQUEST["str"];
        $ed = $_REQUEST["ed"];
        
        $sql = "SELECT * FROM FXData WHERE fx_id >= ".$str." AND fx_id <= ".$ed;
        $result =$conn -> query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              $output =  $output . "" . $row["fx_id"]. "," . $row["fx_datetime"]. "," . $row["openBid"]."," . $row["highBid"]."," . $row["lowBid"]."," . $row["closeBid"]."," . $row["openAsk"]."," . $row["highAsk"]."," . $row["lowAsk"]."," . $row["closeAsk"]."," . $row["labels"]. "\n";
            }
        } else {
            echo "0 results";
        }
        break;
        
    case "2":
        //SELECT (1.202810 - `openBid`) AS tolfyou FROM `FXData` WHERE `fx_id` <= 3;
        $str = $_REQUEST["str"];
        $ed = $_REQUEST["ed"];
        
        $sql = "SELECT (DAY(`fx_datetime`)/31) AS Day, (MONTH(`fx_datetime`)/12) AS Month, (HOUR(`fx_datetime`)/24) AS Hour, (MINUTE(`fx_datetime`)/60) AS Minutes, \n"

    . "(`openBid`/(SELECT MAX(`openBid`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS ob, \n"

    . "(`highBid`/(SELECT MAX(`highBid`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS hb,\n"

    . "(`lowBid`/(SELECT MAX(`lowBid`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS lb,\n"

    . "(`closeBid`/(SELECT MAX(`closeBid`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS cb,\n"

    . "(`openAsk`/(SELECT MAX(`openAsk`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS oa,\n"

    . "(`highAsk`/(SELECT MAX(`highAsk`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS ha,\n"

    . "(`lowAsk`/(SELECT MAX(`lowAsk`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS la,\n"

    . "(`closeAsk`/(SELECT MAX(`closeAsk`)FROM `FXData` WHERE fx_id >= ".$str." AND fx_id <= ".$ed.")) AS ca,\n"

    . "`labels`\n"

    . "FROM `FXData` \n"

    . "WHERE fx_id >= ".$str." AND fx_id <= ".$ed.";";
    
        $result =$conn -> query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              $output =  $output . "" . $row["Day"]. "," . $row["Hour"]. "," . $row["Minutes"]."," . $row["ob"]."," . $row["hb"]."," . $row["lb"]."," . $row["cb"]."," . $row["oa"]."," . $row["ha"]."," . $row["la"]."," .$row["ca"]."," . $row["labels"]. "\n";
            }
        } else {
            echo "0 results";
        }
        break;
    
    default:
      echo "GET OUT!!";
      header('Location: tester.html');
      exit; 
}

echo $output;

?>
