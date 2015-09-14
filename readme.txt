1. to apply changes to .vm on disk: restart tomcat, set custom theme to soft29
2. to apply changes to .js on disk: set custom theme to soft29, without tomcat restart
3. all resources (css js) should be added to theme.xml. Only then import is possible.
4. main menu: http://localhost:8080/soft29/roller-ui/menu.rol
5. a hrefs in blog substituted in index.js

install settings - take from _config:
web.xml from roller + custom error-page
remove index.jsp (otherwise when go to soft29.ru redirect to blog)
