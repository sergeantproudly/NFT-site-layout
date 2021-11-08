document.addEventListener('DOMContentLoaded', function() {

	// ОТКРЫТИЕ ВСТУПИТЕЛЬНОГО ТЕКСТА ПО КНОПКЕ ЧИТАТЬ ДАЛЬШЕ
	$('#introduction .btn-line>.btn').click(function(e) {
		e.preventDefault();

		$('#introduction .text').addClass('opened');
		$(this).hide();
	});

	// ОТКРЫТИЕ ВСЕХ РАБОТ ПО КНОПКЕ ВСЕ РАБОТЫ
	$('#gallery .btn-line>.btn').click(function(e) {
		e.preventDefault();

		$('#gallery ul>li.hidden').removeClass('hidden');
		$(this).hide();
	});

	// ОТКРЫТИЕ ОТВЕТА ПО КЛИКУ НА ВОПРОС ИЛИ ИКОНКУ В СЕКЦИИ ВОПРОСОВ-ОТВЕТОВ
	$('#faq ul>li').children('h3, .h3, .toggler').click(function(e) {
		e.stopPropagation();

		var $li = $(this).closest('li');
		if (!$li.hasClass('opened')) {
			$li.addClass('opened');
		} else {
			$li.removeClass('opened');
		}
	});

	// ССЫЛКИ НА МОДАЛЫ
	$('.js-modal-link').click(function(e) {
		e.preventDefault();
		showModal($(this).attr('href') ? $(this).attr('href').substring(1) : $(this).attr('data-target').substring(1));
	});

});