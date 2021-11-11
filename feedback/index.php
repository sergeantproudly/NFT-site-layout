<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__.'/../vendor/autoload.php';

$filename = './mails';
$text = $_POST['text'];

if ($text) {
    file_put_contents($filename, $text . PHP_EOL . PHP_EOL, FILE_APPEND);

    $mail = new PHPMailer(true);
	$mail->setLanguage('ru', '/var/www/stage/vendor/phpmailer/phpmailer/language/');

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.yandex.ru';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'contact@celestialhermitage.ru';                     //SMTP username
        $mail->Password   = 'Theartistispresent001';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS

//        $mail->setLanguage('ru', '/var/www/stage/vendor/phpmailer/phpmailer/language/');
        $mail->CharSet = "UTF-8";

        //Recipients
        $mail->setFrom('contact@celestialhermitage.ru');
        $mail->addAddress('info@proudly.ru');     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Отзыв о выставке «НЕЗРИМЫЙ ЭФИР» Эрмитаж';
        $mail->Body    = $text;

        $mail->send();
    } catch (Exception $e) {
        //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
