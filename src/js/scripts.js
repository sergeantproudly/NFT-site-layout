document.addEventListener('DOMContentLoaded', function() {

	initElements();

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

	// КОММЕНТАРИИ К ОПРЕДЕЛЕНИЯМ
	var $comment = $('#comment-popup');
	var padd_size = 15;
	var popup_size = 330;

	function commentPos(dfn) {
		var $dfn = dfn ? $(dfn) : $($comment.data('dfn'));
		var $holder = $('#introduction');
		var dfn_coords = {
			top: $dfn.offset().top - $holder.offset().top,
			left: $dfn.offset().left - $holder.offset().left
		};
		if (__isMobileTabletSmall) { // мобильный вариант
			$comment.css({
				position: 'fixed',
				top: 'auto',
				bottom: padd_size + 'px',
				right: padd_size + 'px',
				left: padd_size + 'px',
				width: 'auto'
			});

		} else if (__isMobileDesktop) { // планшетный вариант
			if ($(window).width() - $dfn.offset().left - $dfn.innerWidth() > popup_size + padd_size * 2) { // умещается справа
				$comment.css({
					position: 'absolute',
					top: (dfn_coords.top + $dfn.innerHeight() / 2) + 'px',
					bottom: 'auto',
					right: 'auto',
					left: (dfn_coords.left + $dfn.innerWidth() + padd_size) + 'px',
					width: popup_size + 'px'
				});
			} else if ($dfn.offset().left > popup_size + padd_size * 2) { // умещается слева
				$comment.css({
					position: 'absolute',
					top: (dfn_coords.top + $dfn.innerHeight() / 2) + 'px',
					bottom: 'auto',
					right: 'auto',
					left: (dfn_coords.left - padd_size - popup_size) + 'px',
					width: popup_size + 'px'
				});
			} else {
				$comment.css({
					position: 'fixed',
					top: 'auto',
					bottom: padd_size + 'px',
					right: padd_size + 'px',
					left: padd_size + 'px',
					width: 'auto'
				});
			}

		} else { // десктопный вариант
			if ($(window).width() - $dfn.offset().left - $dfn.innerWidth() > popup_size + padd_size * 2) { // умещается справа
				$comment.css({
					position: 'absolute',
					top: (dfn_coords.top + $dfn.innerHeight() / 2) + 'px',
					bottom: 'auto',
					right: 'auto',
					left: (dfn_coords.left + $dfn.innerWidth() + padd_size) + 'px',
					width: popup_size + 'px'
				});
			} else if ($dfn.offset().left > popup_size + padd_size * 2) { // умещается слева
				$comment.css({
					position: 'absolute',
					top: (dfn_coords.top + $dfn.innerHeight() / 2) + 'px',
					bottom: 'auto',
					right: 'auto',
					left: (dfn_coords.left - padd_size - popup_size) + 'px',
					width: popup_size + 'px'
				});
			} else {
				$comment.css({
					position: 'fixed',
					top: 'auto',
					bottom: padd_size + 'px',
					right: padd_size + 'px',
					left: padd_size + 'px',
					width: 'auto'
				});
			}
		}
	}
	function commentOpen(dfn) {
		if ($comment.is(':visible')) {
			commentClose(true);
		}

		$comment.children('div').html($(dfn).next('.comment').html());
		$comment.data('dfn', dfn);
		commentPos(dfn);
		$comment.stop().fadeIn(__animationSpeed);
	}
	function commentClose(instantly) {
		if (instantly) $comment.hide();
		else $comment.stop().fadeOut(__animationSpeed);
	}

	$('.dfn').each(function(i, dfn) {
		$(dfn).click(function(e) {
			e.preventDefault();

			commentOpen(this);
		});
	});
	$comment.children('.close').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			commentClose();
	});
	$('body').mouseup(function(e) {
		if ($comment.is(':visible')) {
			commentClose();
		}

	}).keyup(function(e){
		if (!e)e = window.event;
		var key = e.keyCode||e.which;

		if ($comment.is(':visible') && key == 27) {
			commentClose();
		}
	});
	resizeCallbacks.push(function () {
		commentPos();
	});

});