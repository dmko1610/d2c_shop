Проект запускается и работает на обоих платформах.
Также дополнительно проверял на реальном андроиде.
Юнит тесты тоже работают, есть ворнинги, но их решил не фиксить.

По поводу обработки ошибок с "бекенда", приложение в 50% случаев успешно переходит на последний экран, но есть шанс получить ошибку 3-ёх видов -
закончилось, ошибка сервера и непредвиденная ошибка сервиса. Тестировать сильно не стал.

Не стал заморачиваться с локализацией и темизацией, использовал базовую стилизацию из материал.

`npm i` - install modules.  
`cd ios && bundle install` - install gems  
`bundle exec pod install` - (in ios directory) install pods  
`cd ..` - go back  
`npm run start` - start packager.
`npm run ios/android` - build and install app in development mode.

_________________
#### _я использую [asdf](https://asdf-vm.com/guide/getting-started.html) для nodejs и ruby, поэтому их версии указаны в файле .tool-versions_
