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
        <link rel="stylesheet" href="/login/signin.css">
        <script src="/main/functions.js"></script>
    </head>
    <body>
        <?php
            if ($dbconn) {
                $email = $_POST['inputEmail'];
                $q1="select * from utente where email= $1";
                $result=pg_query_params($dbconn, $q1, array($email));
                $emailfriend = $_POST['emailAmico'];
                $result1=pg_query_params($dbconn, $q1, array($emailfriend));
                if (pg_fetch_array($result,null)) {
                    echo '<script>vaiAllaReg(" Spiacente, l indirizzo email non è disponibile  Se vuoi, <a href=../login> clicca qui per loggarti </a>");</script>';
                    
                    
                }
               
                else if ($emailfriend!=null && pg_num_rows($result1)==0) {
                    echo '<script>vaiAllaReg(" Spiacente, l indirizzo email del tuo amico non e  presente nel database");</script>';
                   
                }
                
                else {
                    $nome = $_POST['inputName'];
                    $cognome = $_POST['inputSurname'];
                    
                    $password = password_hash($_POST['inputPassword'],PASSWORD_DEFAULT);
                    $q2 = "insert into utente values ($1,$2,$3,$4)";
                    $data = pg_query_params($dbconn, $q2,
                        array( $nome, $cognome,$email, $password));
                    if ($emailfriend!=null){
                        $q2="update utente set amici=amici+1 where email=$1";
                        $iunta=pg_query_params($dbconn,$q2,array($emailfriend));
                         
                    }
                    if ($data) {
                        echo '<script>vaiAllaReg("Registrazione completata. <a href="/login/index.html"> Clicca qui </a>
                        per loggarti!");</script>';
                        
                        
                       
                    }
                }
            }
        ?> 
    </body>
</html>
