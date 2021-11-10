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
		if ($comment.is(':visible')) {
			commentPos();
		}
	});

	// ФОРМА ОБРАТНОЙ СВЯЗИ
	$('#feedback-form').submit(function(e) {
		e.preventDefault();

		if ($('#feedback-form textarea').val()) {
			$.ajax({
				type: 'POST',
				url: '/virtual/',
				success: function(response) {
					if (response == 'OK') {
						console.log('OK');

					} else {
						console.log('SUCCESS BUT NOT OK');
					}
				},
				error: function() {
					console.log('FAIL');
				}
			}); 

			$('#feedback-form textarea').val('');
			showModal('modal-done');
		}
	});

	// LIGHTBOXES
	var galleries = new Array();
	$('.js-lightbox').each(function(i, a) {
		if (!$(a).is('[data-gallery]')) {
			$(a).magnificPopup({
				type: 'image',
				removalDelay: 300,
				callbacks: {
			        beforeOpen: function() {
			            $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
			        },
			        beforeClose: function() {
			        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
			        }
			    },
				midClick: true
			});
		} else {
			if (typeof(galleries[$(a).attr('data-gallery')]) == 'undefined') galleries.push($(a).attr('data-gallery'));
		}
	});
	$.each(galleries, function(i, gallery) {
		$('.js-lightbox[data-gallery="' + gallery + '"]').magnificPopup({
			type: 'image',
			removalDelay: 300,
			callbacks: {
		        beforeOpen: function() {
		             $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
		        },
		        beforeClose: function() {
		        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
		        }
		    },
			gallery: {
				enabled: true
			},
			midClick: true
		});
	});

	// ПЕРЕХОД В ВИРТУАЛЬНУЮ ГАЛЕРЕЮ
	$('#modal-virtual .js-continue').click(function(e) {
		e.preventDefault();

		var def_link = 'https://app.spatial.io/rooms/618af4f941b26f00013f8c37?share=3165115283768468933';
		$.ajax({
			type: 'POST',
			url: '/virtual/',
			success: function(response) {
				if (response) {
					var link = response;
					redirect(link);

				} else {
					var link = def_link;
					console.log('success but empty');
					redirect(link);
				}
			},
			error: function() {
				var link = def_link;
				console.log('error');
				redirect(link);
			}
		}); 
	});

});