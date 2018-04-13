

(FormValidator = {
	/**
	 * config params
	 * */
	config: {
		sendFormTrigger : {},
		inputWrapper    : 'label',
		dataRequired    : '[data-required]',
		dataMessage     : '[data-message]',
		dataValid       : '[data-valid]',
		errorClass      : 'error',
		positionObj     : {
			'top': 'calc(100% + 5px)',
			'left':'auto',
			'bottom':'auto',
			'right':'0',
			'transform':'translateY(0)',
			'width': '100%'
		}
	},



	//смена способа доставки
	changeDeliveryType: function(field)
	{
		//radio
		this.removeError(field);
		//radio

		var defaultInput = $('[data-typeid="0"] input');
		var currentWrapper = $('[data-typeid="'+ field.val() +'"]');


		$('.orderadress').hide().find('select, input').attr('data-aria-valid',false);

		if (currentWrapper.length > 0) {
			currentWrapper.show().find('select, input').attr('data-aria-valid',true);
			this.removeError(currentWrapper.find('select'));
			this.removeError(currentWrapper.find('input'));
			defaultInput.attr('data-aria-valid',false);
		} else {
			this.removeError(defaultInput);
			defaultInput.attr('data-aria-valid',true);
			$('[data-typeid="0"]').show();
		}
	},

	/**
	 *  Сообщение для обезательного поля: return message error + false
	 * */
	getRequiredMessage:function (field)
	{
		if ($(field).parent().find('.required_message').length) return false;



		field.parent().removeClass(this.config.errorClass).find('i').remove();

		var THIS = this,
			requiredATTR = this.config.dataRequired.slice(1, -1);

		if (typeof field.attr(requiredATTR) !== 'undefined' && field[0].tagName == 'SELECT') {
			var captionSelect = field.parent().find('.name-group');

			if(captionSelect.hasClass(this.config.errorClass)){
				return;
			}
			captionSelect.addClass( this.config.errorClass );
			captionSelect.append('<i class="required_message " title="'+ field.attr(requiredATTR) +'"></i>')
				.find('i')
				.tooltip()
				.on( "tooltipopen", function( event, ui )
				{
					$(this).parent().append(ui.tooltip[0]);
					ui.tooltip.css({
						'top':          THIS.config.positionObj.top,
						'left':         THIS.config.positionObj.left,
						'bottom':         THIS.config.positionObj.bottom,
						'right':        THIS.config.positionObj.right,
						'transform':    THIS.config.positionObj.transform,
						'width':        $(this).parent().width()
					})
				})
				.tooltip( "open" );

			return false;
		}

		if (typeof field.attr(requiredATTR) !== 'undefined' && $(field).attr('type') == 'radio') {
			var caption = field.parent().parent().parent().find('.name-group');

			if(caption.parent().hasClass(this.config.errorClass)){
				return;
			}
			caption.parent().addClass( this.config.errorClass );
			caption.append('<i class="required_message " title="'+ field.attr(requiredATTR) +'"></i>')
				.find('i')
				.tooltip()
				.on( "tooltipopen", function( event, ui )
				{
					$(this).parent().append(ui.tooltip[0]);
					ui.tooltip.css({
						'top':          THIS.config.positionObj.top,
						'left':         THIS.config.positionObj.left,
						'bottom':         THIS.config.positionObj.bottom,
						'right':        THIS.config.positionObj.right,
						'transform':    THIS.config.positionObj.transform,
						'width':        $(this).parent().width()
					})
				})
				.tooltip( "open" );

			return false;
		}

		if (typeof field.attr(requiredATTR) !== 'undefined') {

			field.parent().addClass( this.config.errorClass );
			field.parent()
				.append('<i class="required_message " title="'+ field.attr(requiredATTR) +'"></i>')
				.find('i')
				.tooltip()
				.on( "tooltipopen", function( event, ui )
				{
					$(this).parent().append(ui.tooltip[0]);
					ui.tooltip.css({
						'top':          THIS.config.positionObj.top,
						'left':         THIS.config.positionObj.left,
						'bottom':         THIS.config.positionObj.bottom,
						'right':        THIS.config.positionObj.right,
						'transform':    THIS.config.positionObj.transform,
						'width':        $(this).parent().width()
					})
				})
				.tooltip( "open" );
			setTimeout(function () {
				// field.parent().find('.required_message').tooltip( "close" );
			}, 3000);
			return false;
		}
	},
	/**
	 *  Сообщение для поля с неправильными данными : return message correct + false
	 * */
	getIncorrectMessage:function (field)
	{
		if ($(field).parent().find('.incorrect_message').length) {
			return false;
		}

		var THIS = this;
		field.parent().removeClass(this.config.errorClass).find('i').remove();
		var messageATTR = this.config.dataMessage.slice(1, -1);
		if (typeof field.attr(messageATTR)  !== 'undefined') {
			$(field).parent().addClass( this.config.errorClass );
			$(field).parent()
				.append('<i class="incorrect_message" title="'+ field.attr(messageATTR) +'"></i>')
				.find('i')
				.tooltip()
				.on( "tooltipopen", function( event, ui ) {
					$(this).parent().append(ui.tooltip[0]);
					ui.tooltip.css({
						'top':          THIS.config.positionObj.top,
						'left':         THIS.config.positionObj.left,
						'bottom':         THIS.config.positionObj.bottom,
						'right':        THIS.config.positionObj.right,
						'transform':    THIS.config.positionObj.transform,
						'width':        $(this).parent().width()
					})
				}).tooltip( "open" );

			setTimeout(function () {
				// field.parent().find('.incorrect_message').tooltip( "close" );
			}, 3000);
			return false;
		}
	},
	/**
	 * function for remove all errors
	 * */
	removeError : function (field)
	{
		field.parent().removeClass( this.config.errorClass );
		field.parent().find('i').tooltip( "destroy" ).remove();

		if ($(field).attr('type') == 'radio') {
			var caption = field.parent().parent().parent().find('.name-group');

			if(caption.parent().hasClass(this.config.errorClass)){
				caption.parent().removeClass(this.config.errorClass);
			}
			caption.find('i').tooltip( "destroy" ).remove();
			return false;
		}
	},


	/**
	 * function for check form on click
	 * @param formId
	 */
	checkFields: function(formId)
	{


		var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


		if (!isFirefox) {
			// event.preventDefault();
			// event.stopPropagation();
		}
		var checkOutForm = false;
		if (formId == '#Form' || formId == '.info_user') {
			checkOutForm = true;
		}

		if (formId == '#reviews_form') {
			location.hash = '';
		}



		var sendForm = true;
		var isAllow = true;
		var THIS = this;
		var requiredATTR = THIS.config.dataRequired.slice(1, -1);
		// document.removeEventListener("blur", THIS.blurField);
		$(
			formId + ' input'       + THIS.config.dataRequired +','+
			formId + ' input'       + THIS.config.dataValid +','+
			formId + ' select'      + THIS.config.dataRequired +','+
			formId + ' select'      + THIS.config.dataValid +','+
			formId + ' textarea'    + THIS.config.dataRequired +','+
			formId + ' textarea'    + THIS.config.dataValid).each(function(index) {

			var type = $(this).attr(THIS.config.dataValid.slice(1, -1));

			if ( typeof $(this).attr(requiredATTR) !== 'undefined') {
				if ($(this).attr('data-aria-valid') != 'false') {
					isAllow = THIS.checkRequiredField($(this));
				}
			}
			if (isAllow && typeof type !== 'undefined' && $(this).attr('data-aria-valid') != 'false') {
				switch (type) {
					case 'email':
						sendForm = THIS.checkEmail($(this));
						break;
					case 'latin_chars_numbers':
						sendForm = THIS.checkLatin_Numb($(this));
						break;
					case 'phone_free':
						sendForm = THIS.checkPhone($(this));
						break;
					case 'phone':
						sendForm = THIS.checkPhoneUkr($(this));
						break;
					case 'search':
						sendForm = THIS.checkSearch($(this));
						break;
					case 'chars':
						sendForm = THIS.checkCharacters($(this));
						break;
					case 'textarea':
						sendForm = THIS.checkLength($(this));
						break;
					case 'password':
						sendForm = THIS.checkPassword($(this));
						break;
					default:
						console.log('Add plz rule for ' + type + ' field!!!')
				}
			}
			if (!sendForm || !isAllow) {
				THIS.config.sendFormTrigger[index] = false;
				return;
			} else {
				THIS.config.sendFormTrigger[index] = true;
			}




			//для статической формы заказа.
			if (checkOutForm) {

				if ($(this).attr('type') == 'radio' && this.validity.valueMissing) {
					THIS.config.sendFormTrigger[index] = false;
					THIS.getRequiredMessage($(this));
				} else {
					THIS.config.sendFormTrigger[index] = true;
					THIS.removeError($(this));
				}


				if ($(this).attr('data-aria-valid') == 'false') {
					THIS.config.sendFormTrigger[index] = true;
					THIS.removeError($(this));
				} else {

				}
			}


		});

		var len = $.map(THIS.config.sendFormTrigger, function(n, i) { return i; }).length;
		for (var i =0; i <= len; i++ ) {
			if (THIS.config.sendFormTrigger[i] == false) {
				if(!$('.fancybox-container').length){//выключаем скролл в модальном окне
					$('html, body').animate({ scrollTop: $('.' + this.config.errorClass).eq(0).offset().top - 100}, 500);
				}
				return false;
			}
		}
		if (THIS.config.sendFormTrigger) {
			// $(formId).find('[onclick*="FormValidator.checkFields"]').addClass('disabled sending');
			$(formId).submit();
			return true;
		}
	},
	/**
	 * function for check inputs fields
	 * @param field
	 * @param type
	 */
	blurField:function (field, type)
	{
		field.blur(function(e){
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();
			$(this).off("blur");
			$(this).unbind("blur");
			return false;
		});

		var isAllow = true;
		var THIS = this;

		var requiredATTR = THIS.config.dataRequired.slice(1, -1);
		var typeValid = THIS.config.dataValid.slice(1, -1);

		if (typeof field.attr(requiredATTR) !== 'undefined') {
			isAllow = THIS.checkRequiredField(field);
		}
		if (isAllow && typeof field.attr(typeValid) !== 'undefined') {
			switch (type) {
				case 'email':
					THIS.checkEmail(field);
					break;
				case 'latin_chars_numbers':
					THIS.checkLatin_Numb(field);
					break;
				case 'phone_free':
					THIS.checkPhone(field);
					break;
				case 'phone':
					THIS.checkPhoneUkr(field);
					break;
				case 'search':
					THIS.checkSearch(field);
					break;
				case 'chars':
					THIS.checkCharacters(field);
					break;
				case 'textarea':
					THIS.checkLength(field);
					break;
				case 'password':
					THIS.checkPassword(field);
					break;
				default:
					console.log('Add plz rule for ' + type + ' field!!!')
			}
		}

		if (isAllow) {
			if (THIS.config.sendFormTrigger == true) {
				// $('.sendButton, .send_btn').trigger('click', THIS.checkFields());
			}
		}


		if ($('.user_fields').length) {
			$('.user_fields label').each(function () {

				if ($(this).hasClass(THIS.config.errorClass) || $(this).find('input').val() == '') {
					$('.form-user .next_step').addClass('disabled');
					return false;
				} else {
					$('.form-user .next_step').removeClass('disabled');
				}
			});

		}



	},

	//не менее 30 символов
	checkLength : function(field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();
		if (inputValue.length < 30 && inputValue != ''){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//телефон от 5 до 17 символов
	checkPhone : function(field)
	{
		var match = field.val().indexOf('_');

		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternPHONE = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9 \-\.]{1,12}){1,2}$/;
		var testPHONE = patternPHONE.test(inputValue);
		if (!testPHONE || inputValue.length < 5 || inputValue.length > 17){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//телефон украинских операторов
	checkPhoneUkr : function(field)
	{
		var match = field.val().indexOf('_');

		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternPHONE = /^(\+38)?\s0\d{2}\s{1}\d{3}-\d{2}-\d{2}$/;
		var testPHONE = patternPHONE.test(inputValue);
		if (!testPHONE || inputValue.length < 5 || inputValue.length > 17){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//Електронная почта
	checkEmail : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternEmail = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e][a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,10}$/;
		var testEmail = patternEmail.test(inputValue);
		if (!testEmail && inputValue != ''){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//Латинница и цифры
	checkLatin_Numb : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternLatin_Numb = /^\s*([0-9a-zA-Z]*)\s*$/;
		var testLatin_Numb = patternLatin_Numb.test(inputValue);
		if (!testLatin_Numb || inputValue != ''){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//пароль
	checkPassword : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternPassword = /^[a-z0-9_\+!@;#$%^&*~\(\)\-]{3,20}$/;
		var testPassword = patternPassword.test(inputValue);
		if (!testPassword || inputValue.length <= 3 || inputValue.length >= 20){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	//Все буквенные символы
	checkCharacters : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternCharacters = /^[^\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e\d]{3,}$/;
		var testCharacters = patternCharacters.test(inputValue);
		if (!testCharacters || inputValue.length > 35){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	checkSearch : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		var patternCharacters = /^[\wа-яА-Я`ґєҐЄ´ІіЇї'.,-№\\/\s]{3,}$/;
		var testCharacters = patternCharacters.test(inputValue);
		if (!testCharacters){
			THIS.getIncorrectMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},
	checkRequiredField : function (field)
	{
		var isAllow = true;
		var THIS = this;
		var inputValue = $(field).val();

		if (inputValue === '' || inputValue === '0' || inputValue === null) {
			THIS.getRequiredMessage(field);
			isAllow = false;
		} else {
			THIS.removeError(field);
		}
		return isAllow;
	},

	sendByEnter : function ()
	{
		var THIS = this;
		$('form').each(function() {
			var forms = this;
			if (forms.id == '') {
				return;
			}
			$(this).find('input').keypress(function(e) {
				// Enter pressed?
				if(e.which == 10 || e.which == 13) {
					THIS.checkFields('#' + forms.id);
				}
			});
		});
	}

});


/**
 * height`s for all blocks on page
 * usage: $('block').setAllToMaxHeight()
 */
function setEqualHeight(columns) {
	var tallestcolumn = 0;
	columns.each(
		function() {
			currentHeight = $(this).height();
			if(currentHeight > tallestcolumn) {
				tallestcolumn  = currentHeight;
			}
		}
	);
	columns.height(tallestcolumn);
}

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

/**
 * function for fix image height as width
 * ready and resize
 * @param {number} stopWidth
 * @param {boolean} direction
 * @returns {boolean}
 */
$.fn.squareImages = function (stopWidth, direction) {
	if (typeof this == 'undefined') {
		console.log('plz corrected JavaScript');
		return false;
	}

	direction = direction || false;

	var THIS = this;
	if (!direction) {
		$(window).resize(function () {
			if (window.innerWidth > stopWidth) {
				THIS.height(THIS.width());
			} else {
				THIS.attr('style','');
			}
		});
		if (window.innerWidth > stopWidth) {
			this.height(this.width());
		} else {
			THIS.attr('style','');
		}
	} else {
		$(window).resize(function () {
			if (window.innerWidth < stopWidth) {
				THIS.height(THIS.width());
			} else {
				THIS.attr('style','');
			}
		});
		if (window.innerWidth < stopWidth) {
			this.height(this.width());
		} else {
			THIS.attr('style','');
		}
	}
};

/**
 *  height`s per row
 *  only ready
 *  @param container {string}
 * */
function equalRowHeight(container){
	var currentTallest = 0,
		topPosition = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el;
	$(container).each(function() {

		$el = $(this);
		$($el).height('auto');
		topPosition = $el.offset().top;

		if (currentRowStart != topPosition) {
			for ( var currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPosition;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
	var ua = navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {// IE 11 => return version number
		var rv = ua.lastIndexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}// other browser
	return false;
}

/**
 *  function for fix any div
 * @param targetBlock {string}
 * @param stopBlock {string}
 * @param offsetTop {int}
 * @param offsetBottom {int}
 */
function stickyContent(targetBlock, stopBlock, offsetTop, offsetBottom){

	var a = document.querySelector(targetBlock), b = null, K = null, Z = 0, P = offsetTop, N = offsetBottom;  // если у P ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента, если у N — нижний край дойдёт до нижнего края элемента. Может быть отрицательным числом
	window.addEventListener('scroll', Ascroll, false);
	document.body.addEventListener('scroll', Ascroll, false);
	function Ascroll() {
		var Ra = a.getBoundingClientRect(),
			R1bottom = document.querySelector(stopBlock).getBoundingClientRect().bottom;
		if (Ra.bottom < R1bottom) {
			if (b == null) {
				var Sa = getComputedStyle(a, ''), s = '';
				for (var i = 0; i < Sa.length; i++) {
					if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
						s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
					}
				}
				b = document.createElement('div');
				b.className = "stop";
				b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
				a.insertBefore(b, a.firstChild);
				var l = a.childNodes.length;
				for (var k = 1; k < l; k++) {
					b.appendChild(a.childNodes[1]);
				}
				a.style.height = b.getBoundingClientRect().height + 'px';
				a.style.padding = '0';
				a.style.border = '0';
				a.style.background = 'transparent';
			}
			var Rb = b.getBoundingClientRect(),
				Rh = Ra.top + Rb.height,
				W = document.documentElement.clientHeight,
				R1 = Math.round(Rh - R1bottom),
				R2 = Math.round(Rh - W);
			if (Rb.height > W) {
				if (Ra.top < K) {  // скролл вниз
					if (R2 + N > R1) {  // если не дойти до низа
						if (Rb.bottom-5 - W + N <= 0) {  // подцепиться "-5 фикс высоты"
							if(navigator.userAgent.search(/Firefox/) > -1){
								b.className = 'sticky';
								b.style.top = W - Rb.height + 'px';
								Z = N + Ra.top + Rb.height - W;
							}else{
								b.className = 'sticky';
								b.style.top = W - Rb.height - N + 'px';
								Z = N + Ra.top + Rb.height - W;
							}
						} else {
							b.className = 'stop';
							b.style.top = - Z + 'px';
						}
					} else {
						b.className = 'stop';
						b.style.top = - R1 +'px';
						Z = R1;
					}
				} else {  // скролл вверх
					if (Ra.top - P < 0) {  // не дойти до верха
						if (Rb.top - P >= 0) {  // подцепиться
							b.className = 'sticky';
							b.style.top = P + 'px';
							Z = Ra.top - P;
						} else {
							b.className = 'stop';
							b.style.top = - Z + 'px';
						}
					} else {
						b.className = '';
						b.style.top = '';
						Z = 0;
					}
				}
				K = Ra.top;
			} else {
				if ((Ra.top - P) <= 0) {
					if ((Ra.top - P) <= R1) {
						b.className = 'stop';
						b.style.top = - R1 +'px';
					} else {
						b.className = 'sticky';
						b.style.top = P + 'px';
					}
				} else {
					b.className = '';
					b.style.top = '';
				}
			}
			window.addEventListener('resize', function() {
				a.children[0].style.width = getComputedStyle(a, '').width
			}, false);
		}
		if( window.pageYOffset == 0 ){
			b.className = "";
		}
	}
}

/**
 * * disable - enable scroll functions
 left: 37, up: 38, right: 39, down: 40,
 spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
 */
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) {
		e.preventDefault()
	}
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}
function disableScroll() {
	if (window.addEventListener){
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	}
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove  = preventDefault; // mobile
	document.onkeydown  = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener){
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	}
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	window.onpointermove = null;
	document.onkeydown = null;
}
/**
 * * disable - enable scroll functions end
 */


/**
 *  * function for scroll document to element
 * @param elem {string}
 * @param offsetRange {number}
 */
function scrollToElem( elem, offsetRange ) {
	if (offsetRange === undefined) {
		offsetRange = 0;
	}
	if ($(elem).length > 0) {
		$('html, body').animate({ scrollTop: $(elem).eq(0).offset().top - offsetRange }, 500);
	}
}
//___________________ FUNCTION COOKIES
/**
 *  function to set cookie
 * @param name
 * @param value
 * @param days
 */
function createCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}
/**
 * function to get cookie
 * @param name
 * @returns {*}
 */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
/**
 * delete cookie
 * @param name
 */
function eraseCookie(name) {
	createCookie(name,"",-1);
}
//___________________ FUNCTION COOKIES


/**
 *
 * @param fixed_block
 * @param trigger_block
 * @param {number} deleter
 */
function fixedOnWindow(fixed_block, trigger_block, deleter) {



	var WINDOW_SCROLL = $(window).scrollTop(),
		trigger_top = window.innerHeight/deleter,
		content_top = $(trigger_block).offset().top,
		content_bottom = $(trigger_block).offset().top + $(trigger_block).outerHeight(true),
		trigger_bottom = $(window).scrollTop() + window.innerHeight;

	if (deleter == 0) {
		trigger_top = content_top;
	}




	if (WINDOW_SCROLL + trigger_top > content_top) {
		$(fixed_block).addClass('sticky').css('top', trigger_top);
	} else {
		$(fixed_block).removeClass('sticky').css('top',$(trigger_block).offset().top);
	}
	if (!$('.single_tabs').length) {
		if(trigger_bottom > content_bottom ){
				$(fixed_block).removeClass('sticky').css('top', content_bottom - window.innerHeight + trigger_top);
		}
	} else {
		if(trigger_bottom - content_top - ( - $('.single_auto .auto_item').outerHeight() + $('.single_auto .auto_item').outerHeight(true))  + $(fixed_block).outerHeight(true) > content_bottom ){
			$(fixed_block).removeClass('sticky').css('top', content_bottom - $(fixed_block).outerHeight(true));
		}
	}
}

function switchImages(block) {
	$(window).resize(function () {
		if (window.innerWidth <= 900) {
			$(block).each(function () {
				if ($(this).find('img').length) {
					return false;
				}
				var imgSRC = $(this).data('menu-image');
				$(this)[0].insertAdjacentHTML('afterbegin', '<img src="'+ imgSRC +'">');
			});
		} else {
			$(block).find('img').remove();
		}
	});
	if (window.innerWidth > 900) {
		return false;
	}
	$(block).each(function () {
		var imgSRC = $(this).data('menu-image');
		$(this)[0].insertAdjacentHTML('afterbegin', '<img src="'+ imgSRC +'">');
	});

}




function vacancyAccordion() {
    $('.vacancy_accordion').accordion({
        collapsible: true,
        icons: { "header": "icon-plus", "activeHeader": "icon-minus" },
        header: ".vacancy_caption",
        heightStyle: "content",
        activate:function (event, ui) {
            if (ui.newHeader.length){
                $('html, body').animate({ scrollTop: ui.newHeader.offset().top - $('header').outerHeight()}, 500);
                ui.newPanel.css({
                    'opacity': 1,
                    'transition-duration':'0.2s',
                    'transition-delay':'0.1s'
                });
            }
            if (ui.oldHeader.length) {
                ui.oldPanel.css({
                    'opacity': 0,
                    'transition-duration':'0s',
                    'transition-delay':'0s'
                });
            }
        }
    });
}






$.fn.serializefiles = function() {
    var obj = $(this);
    var formData = new FormData();

    $.each($(obj).find("input[type='file']"), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
            formData.append(tag.name, file);
        });
    });

    var params = $(obj).serializeArray();

    $.each(params, function (i, val) {
        formData.append(val.name, val.value);
    });

    return formData;
};




$.fn.textSwitcher = function () {
    if (!this.length) return false;
  var textOpen = this.data('text-open');
  var textClose = this.data('text-close');
  var timeStart = this.data('time-start').replace(/:/g, "");
  var timeEnd = this.data('time-end').replace(/:/g, "");

    var now = new Date();
    var currentTime = parseInt(('0' + now.getHours()).slice(-2) + '' + ('0' + (now.getMinutes())).slice(-2) + '' + ('0' + (now.getSeconds())).slice(-2));


    // console.log(parseInt( timeStart ) , currentTime , parseInt(timeEnd));

    if ( parseInt( timeStart ) < currentTime && currentTime < parseInt(timeEnd) ) {
        this.find('b').text(textOpen)
    } else {
        this.find('b').text(textClose)
    }
};



function switchMobileImg(dataAttr, innerWidth) {
    var imageMobile = $('img['+dataAttr+']');
    if (!imageMobile.length) {
        return false;
    }

    imageMobile.each(function () {
        var that = $(this);
        var desktopSrc = that.attr('data-img-original');
        var mobileSrc = that.attr('data-mobile-img');


        if (window.innerWidth <= innerWidth) {
            that.attr('src', mobileSrc);
        } else {
            that.attr('src', desktopSrc);
        }
        $(window).resize(function () {
            if (window.innerWidth <= innerWidth) {
                that.attr('src', mobileSrc);
            } else {
                that.attr('src', desktopSrc);
            }
        });
    });
}



function switchMobileBg(block, innerWidth) {
    var imageBlock = $(block);
    if (!imageBlock.attr('data-mobile-img').length) {
        return false;
    }
    imageBlock.each(function () {
        var that = $(this);
        var desktopSrc = that.attr('data-img-original');
        var mobileSrc = that.attr('data-mobile-img');


        if (window.innerWidth <= innerWidth) {
            that.css('background-image', 'url("'+mobileSrc+'")' );
        } else {
            that.css('background-image', 'url("'+desktopSrc+'")' );
        }
        $(window).resize(function () {
            if (window.innerWidth <= innerWidth) {
                that.css('background-image', 'url("'+mobileSrc+'")' );
            } else {
                that.css('background-image', 'url("'+desktopSrc+'")' );
            }
        });
    });
}





//pollifil object-fit for IE
function changeImg( classElements, size ) {
    var src = "";

    $(classElements).each(function(){
        src = $(this).attr("src");
        if (src.length) {
            $(this).css({
                "background-image": "url(" + src + ")",
                "background-size":""+ size +"",
                "background-position":"center",
                "background-repeat":"no-repeat"
            }).attr('src','').attr('alt','');
        }
    });
}

function objectFitIE(classElements, size) {
    var  TEST_IE;
    TEST_IE = detectIE();
    if (TEST_IE && TEST_IE <= 15)  // If Internet Explorer, return version number
    {
        changeImg( classElements, size );
    }
    return false;
}













