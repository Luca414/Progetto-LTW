<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: /");
}
else {
    $dbconn = pg_connect("host=localhost port=5432 dbname=ScimmiApparel
                user=postgres password=dajeromadaje") 
                or die('Could not connect: ' . pg_last_error());
}
?>

        <?php
            if ($dbconn) {
                $email = $_POST['username'];
                $cifra=intval($_POST['cifra']);
                $q1="update utente set saldo = saldo + $2 where email = $1";
                pg_query_params($dbconn, $q1, array($email,$cifra));
                $q1="select bonus from utente where email=$1";
                $result=pg_query_params($dbconn, $q1, array($email));
                $row = pg_fetch_array($result, null, PGSQL_ASSOC);
                $bonus = $row['bonus'];
                echo $bonus;
            }
        ?> 
    
