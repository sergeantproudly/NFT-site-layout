<?php

$text = $_POST['text'];
if ($text) {
	if (mail('info@proudly.ru',
		'Отзыв о выставке «НЕЗРИМЫЙ ЭФИР» Эрмитаж"',
		$text
	)) {
		echo 'OK';
	}
}

?>