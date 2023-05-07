<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: /");
}
else {
    $dbconn = pg_connect("host=localhost port=5432 dbname=ScimmiApparel
                user=postgres password=franco,126") 
                or die('Could not connect: ' . pg_last_error());
}
?>
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <?php
            if ($dbconn) {
                $email = $_POST['inputEmail'];
                $q1="select * from utente where email= $1";
                $result=pg_query_params($dbconn, $q1, array($email));
                $emailfriend = $_POST['emailAmico'];
                $result1=pg_query_params($dbconn, $q1, array($emailfriend));
                if (pg_fetch_array($result,null)) {
                    echo "<h1> Spiacente, l'indirizzo email non e' disponibile</h1>
                        Se vuoi, <a href=../login> clicca qui per loggarti </a>";
                }
               
                else if ($emailfriend!=null && pg_num_rows($result1)==0) {
                    echo "<h1> Spiacente, l'indirizzo email del tuo amico non e' presente nel database</h1>";
                        
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
                        echo "<h1> Registrazione completata. 
                            Puoi iniziare a usare il sito <br/></h1>";
                        echo "<a href=../login/index.html> Clicca qui </a>
                            per loggarti!";
                    }
                }
            }
        ?> 
    </body>
</html>
