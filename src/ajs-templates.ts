import * as angular from 'angular';

// Loads all html files in the ajs folder and puts them in the $templateCache of angularjs.
angular.module('app-templates', []).run(['$templateCache', ($templateCache: any) => {

  function requireAll (requireContext: any) {
      return requireContext.keys().map((val: string) => {
          return {
              tpl: requireContext(val), // tpl will hold the value of your html string
              name : `templates/${val.split('/').pop()}` //name is just the filename
          };
      });
  }

  const modules = requireAll(
      import.meta.webpackContext?.(
        './ajs',
      { recursive: true, regExp: /^(?:(?!\.component).)*\.html$/ }
      )
  );

  modules.forEach((val: any) => {
      $templateCache.put(val.name, val.tpl);
  });
}]);
