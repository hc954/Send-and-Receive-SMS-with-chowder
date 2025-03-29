<?php

include('db.php');

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $otp = rand(1000000000, 9999999999);

    if (db::query('SELECT username FROM users WHERE username=:username', array(':username' => $username))) {

        if (password_verify($password, db::query('SELECT password FROM users WHERE username=:username', array(':username' => $username))[0]['password'])) {
            //Correct Password
            db::query('UPDATE users SET password=:password WHERE username=:username', array(':username' => $username, ':password' => password_hash($otp, PASSWORD_BCRYPT)));
            $chatid = DB::query('SELECT chatid FROM users WHERE username=:username', array(':username'=>$username))[0]['chatid'];
            file_get_contents ("https://api.telegram.org/[Bot_Token]/sendmessage?chat_id=".$chatid."&text=".$otp);
            echo '
            <center>
            <form action="otp.php" method="post">
            <input type="text" name="username" value="'.$username.'"><p />
            <input type="text" name="password" value="" placeholder="OTP"><p />
            <input type="submit" name="login" value="Submit">
            </form>
            </center>
            ';


        } else {
            echo 'WRONG!';
        }

    } else {
        echo 'FAKE USER!';
    }
} else {
    echo '
    <center>
    <form action="index.php" method="post">
    <input type="text" name="username" value="" placeholder="Username"><p />
    <input type="password" name="password" value="" placeholder="Password"><p />
    <input type="submit" name="login" value="Get OTP">
    </form>
    </center>
        
    ';
}

?>