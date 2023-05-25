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
                
<!DOCTYPE html>
<html>
    <head>
    <script language="javascript" src="../main/functions.js" ></script>
    </head>
    <body>
        
        <?php
            if ($dbconn) {
                $email = $_POST['inputEmail'];
                $q1 = "select * from utente where email= $1";
                $result = pg_query_params($dbconn, $q1, array($email));
                $tuple=pg_fetch_array($result, null, PGSQL_ASSOC);
                if (!($tuple)) {
                    echo "<h1>Non sembra che ti sia registrato/a</h1>
                        <a href=../registrazione/index.html> Clicca qui per farlo </a>";
                }
                else {
                    $password = $_POST['inputPassword'];
                   
                    if (!(password_verify($password,$tuple["password"]))) {
                        echo "<h1> La password e' sbagliata! </h1>
                            <a href=/login/index.html> Clicca qui per loggarti </a>";
                    }
                    else {
                        $nome=$tuple["nome"];
                        
                        
                        
                       echo "<script>login(".json_encode($email).",".json_encode($nome).");</script>";
                       
                    }
                }
            }
        ?> 
    </body>
</html>