<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__.'/../vendor/autoload.php';
include_once './settings.php';

$filename = './mails';
$text = $_POST['text'];

if ($text) {
    file_put_contents($filename, $text . PHP_EOL . PHP_EOL, FILE_APPEND);

    $mail = new PHPMailer(true);
	$mail->setLanguage('ru', '/var/www/stage/vendor/phpmailer/phpmailer/language/');

    try {
        //Server settings
        $mail->isSMTP();       
        $mail->Host       = $SMTPConfig['host'];
        $mail->SMTPAuth   = true;                            
        $mail->Username   = $SMTPConfig['username']; 
        $mail->Password   = $SMTPConfig['password']; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $SMTPConfig['port'];

        //$mail->setLanguage('ru', '/var/www/stage/vendor/phpmailer/phpmailer/language/');
        $mail->CharSet = "UTF-8";

        //Recipients
        $mail->setFrom('contact@celestialhermitage.ru');
        //$mail->addAddress('info@proudly.ru');
        $mail->addAddress('contact@celestialhermitage.ru');

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Отзыв о выставке «НЕЗРИМЫЙ ЭФИР» Эрмитаж';
        $mail->Body    = $text;

        $mail->send();
    } catch (Exception $e) {
        //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
