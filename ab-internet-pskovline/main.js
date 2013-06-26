﻿/**
Провайдер AnyBalance (http://any-balance-providers.googlecode.com)

Текущий баланс у оператора интернет и телевидения PskovLine.

Сайт оператора: http://www.pskovline.ru
Личный кабинет: http://www.pskovline.ru/utm5/
*/

function main() {
  AnyBalance.setDefaultCharset("utf-8");
  var prefs = AnyBalance.getPreferences();
  var url="http://stat.pskovline.ru/";

//  var info = AnyBalance.requestPost(url, {user_login: prefs.login, password: prefs.password});
  var info = AnyBalance.requestPost(url+'/login', {'user[login]': prefs.login, 'user[password]': prefs.password});

  var result = {success: true}, matches;

        if (info.match("Неверный пользователь или пароль")) {
		throw new AnyBalance.Error("Повторите ввод логина и пароля");
	}
	else if (info.match("input type=\"hidden\" id=\"profile_content\"")) { null; }
	else if (info.match("<html id=\"nojs\">"))
		 info = AnyBalance.requestPost(url+'/login', {'user[login]': prefs.login, 'user[password]': prefs.password});

	if (info.match(/\"tab_user_main\".*?>/i)) {

                       var login, ballance, number, credit, work;

			result['success']=true;
			result['ballance']=parseFloat(info.match(/(\d+,\d+)/ig)[1].replace(",","."));
AnyBalance.trace(result['ballance']);
			if (AnyBalance.isAvailable('login'))
				result['login']=info.match(/ (\w+)<\/title/i)[1];
AnyBalance.trace(result['login']);
			if (AnyBalance.isAvailable('number'))
				result['number']=info.match(/>Лицевой счет.*?(\d+).*?\(/i)[1];
AnyBalance.trace(result['number']);

                        AnyBalance.setResult(result);

        }

        if(!AnyBalance.isSetResultCalled())
                throw new AnyBalance.Error("Ошибка. Проверьте работу личного кабинета. Если Вы можете войти в личный кабинет, а провайдер не работает, обратитесь к автору провайдера.");
}
