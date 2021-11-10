<?php

$filename = './mails';
$text = $_POST['text'];
if ($text) {
	file_put_contents($filename, $text . PHP_EOL . PHP_EOL, FILE_APPEND);

	if (mail('info@proudly.ru',
		'Отзыв о выставке «НЕЗРИМЫЙ ЭФИР» Эрмитаж',
		$text
	)) {
		echo 'OK';
	}
}

?>