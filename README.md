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

### Сборка изображений
```
gulp image:build
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
├── project/                  # Корневая папка проекта
│   ├── src/                  # Исходники
│   │   ├── fonts/           # Шрифты
│   │   ├── img/             # Изображения
│   │   ├── js/              # Скрипты
│   │   │   ├── vendor      # Bower components
│   │   │   ├── main.js     # Главный скрипт
│   │   ├── style/           # Стили
│   │   │   ├── common      # Стили шапки, футера, сайдбар навигации
│   │   │   ├── components  # Компоненты
│   │   │   ├── pages       # Стили для страниц
│   │   │   ├── util        # Переменные, миксины, сетка, шрифты
│   │   │   ├── main.styl   # Главный файл стилей
│   │   ├── templates/       # Шаблоны (разметка)
│   │   │   ├── common       # Общие 
│   │   │   ├── components   # Компоненты
│   │   │   ├── util         # миксины
│   │   │   ├── base.jade    # Базовый шаблон
│   └── index.jade            # Страница
│   ├── build/                # Сборка (автогенерация)
├── .bowerrc                   # Доп. настройки для bower
├── .gitignore                 # Гит игнор
├── bower.json                 # Список пакетов
├── gulpfile.js                # gulp
├── package.json               # Список модулей и прочей информации
└── readme.md                  # Документация шаблона
```


