# TheExplay Project Template
**Шаблон проекта для быстрого старта**


## Старт проекта

### Склонируй репозиторий и перейди в папку проекта
```
git clone git@github.com:Boilerplate.git new-project && cd new-project
```

### Установи пакеты и модули
```
bower i && npm i
```

### Запусти шаблон
```
gulp
```


## Команды для запуска

### Собрать шаблоны с разметкой
```
gulp jade:build
```

### Сборка и минификация js
```
gulp js:build
```

### Сборка стилей
```
gulp style:build
```

### Перенос изображений в ./build
```
gulp image:build
```

### Склеиваем иконки в спрайт из папки ./src/img/sprite
```
gulp sprite:build
```

### Генерируем иконочный шрифт из svg
```
gulp iconfont:build
```

### Перенос шрифтов в папку build
```
gulp fonts:build
```

### Очищаем папку build
```
gulp clean
```

### Запускаем вебсервер
```
gulp webserver
```

## Структура папок и файлов
```
├── App/                      # Корневая папка проекта
│  ├── src/                       # Исходники
│  │  ├── fonts/                  # Шрифты
│  │  ├── img/                    # Изображения
│  │  ├── img/sprite/             # Иконки для склеивания спрайта
│  │  ├── img/svg-icons/          # Иконки для склеивания спрайта
│  │  ├── js/                     # Скрипты
│  │  │  ├── vendor               # Bower components
│  │  │  ├── app.js               # Контроллер
│  │  │  ├── main.js              # Главный скрипт 
│  │  ├── style/                  # Стили
│  │  │  ├── _common              # Общие
│  │  │  │  ├── _base             # Базовые 
│  │  │  │  ├── _color            # Цвета
│  │  │  │  ├── _font             # Шрифты
│  │  │  │  ├── _grid             # Сетка
│  │  │  │  ├── _sprite           # Спрайты
│  │  │  │  ├── _svg-icon         # svg иконки
│  │  │  │  ├── _typography       # Типографика
│  │  │  │  ├── _vendor           # Плагины
│  │  │  ├── components           # Компоненты
│  │  │  ├── pages                # Стили для страниц
│  │  │  ├── main.styl            # Общий файл стилей
│  │  ├── templates/              # Шаблоны (разметка)
│  │  │  ├── components           # Компоненты
│  │  │  ├── base.jade            # Базовый шаблон
│  │  │  ├── _date.json           # Json массив с данными
│  └── index.jade                 # Страница
│  ├── build/                     # Выхлоп (автогенерация)
├── .bowerrc                      # Доп. настройки для bower
├── .editorconfig                 # Код. стайл проекта
├── .gitignore                    # Гит игнор
├── .stylcorc                     # Конфиг для авт. создания компонентов
├── bower.json                    # Список пакетов
├── browserlist.txt               # Список поддерживаемых браузеров
├── gulpfile.js                   # gulp
├── package.json                  # Список модулей и прочей информации
└── readme.md                     # Документация шаблона
```


