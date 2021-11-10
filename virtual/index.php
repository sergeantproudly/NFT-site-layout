<?php

$filename = './counter';
$links = [
	'https://app.spatial.io/rooms/618b7ee52ac8bc00018a7292?share=7014787188496507048',
	'https://app.spatial.io/rooms/618af5727c55ed0001441924?share=5359335304419735038',
	'https://app.spatial.io/rooms/618af7de7c55ed0001441948?share=4950866911423021917',
	'https://app.spatial.io/rooms/618af8322ac8bc00018a6c3d?share=4273406255465438738',
	'https://app.spatial.io/rooms/618acb637c55ed00014416c8?share=4959994921075864340',
	'https://app.spatial.io/rooms/618acbb72ac8bc00018a69bf?share=4524573504096320809',
	'https://app.spatial.io/rooms/618acc367c55ed00014416d7?share=8490043065755065278'
];
$room_size = 20;

$counter = (int) file_get_contents($filename);
$new_counter = $counter + 1;
if ($new_counter > count($links) * $room_size) {
	$new_counter = 1;
}
file_put_contents($filename, $new_counter);

$index = intdiv($counter, $room_size);


echo $links[$index];
return true;

?>