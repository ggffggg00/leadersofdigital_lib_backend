# Backend/Как это работает
В админке работники библиотеки создают по сути граф, привязанный к координатам плана этажа. Длина ребер графа считается по длине векторов. Так мы заполняем матрицу инцидентности и можем расчитать кратчайший маршрут методом Дейкстры
В этом репозитории представлено ядро с модулем итеграции к АБИС. В обязанности ядра входит расчет маршрутов.
По итогу имеем данные о книгах с привязкой их расположения к стеллажам и маршрут до комнат со стелажами.

В Файле sql.sql представлена структура БД

Стек: nodejs+express, postgres, ngnix

СГУГиТ
