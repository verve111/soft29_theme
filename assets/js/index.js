/* ===== Tooltips ===== */

//$('#tooltip').tooltip();

function getURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
	return null;
}

function isRu() {
	var lang = navigator.languages ? navigator.languages[0]
			: (navigator.language || navigator.userLanguage);
	if (lang === 'ru' || lang === 'ru-RU') {
		return true;
	} else {
		return false;
	}
}

$('#blog_navnar.navbar.navbar-default.navbar-fixed-top a[href!="#"]').each(
	function() {
		var href = this.href;
		var sourceLang;
		if (isRu()) {
			sourceLang = '';
		} else {
			sourceLang = 'en/';
		}
		this.href = href.replace('blog/', sourceLang);
	});

$('#blog_navnar.navbar.navbar-default.navbar-fixed-top a').each(
	function() {
		if (!isRu()) {
			return;
		}
		var h = $(this).html();
		if (h.indexOf('Home') == 0) {
			$(this).html(h.replace('Home', 'Главная'));
		}
		if (h.indexOf('Company') == 0) {
			$(this).html(h.replace('Company', 'Компания'));
		}		
		if (h.indexOf('About us') == 0) {
			$(this).html(h.replace('About us', 'O компании'));
		}	
		if (h.indexOf('Contacts') == 0) {
			$(this).html(h.replace('Contacts', 'Контакты'));
		}	
		if (h.indexOf('Solutions') == 0) {
			$(this).html(h.replace('Solutions', 'Решения'));
		}		
		if (h.indexOf('ECM Alfresco') == 0) {
			$(this).html(h.replace('ECM Alfresco', 'Внедрение СЭД Alfresco'));
		}			
		if (h.indexOf('Enterprise Portal Liferay') == 0) {
			$(this).html(h.replace('Enterprise Portal Liferay', 'Корпоративный портал Liferay'));
		}	
		if (h.indexOf('Services') == 0) {
			$(this).html(h.replace('Services', 'Услуги'));
		}		
		if (h.indexOf('Enterprise software') == 0) {
			$(this).html(h.replace('Enterprise software', 'Разработка и внедрение корпоративных ИС'));
		}	
		if (h.indexOf('IT Consulting') == 0) {
			$(this).html(h.replace('IT Consulting', 'ИТ-Консалтинг'));
		}		
		if (h.indexOf('Blog') == 0) {
			$(this).html(h.replace('Blog', 'Блог'));
		}		
	});