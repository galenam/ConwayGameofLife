Место действия этой игры — «вселенная» — это размеченная на клетки поверхность 
или плоскость — безграничная, ограниченная, или замкнутая (в пределе —
бесконечная плоскость). Каждая клетка на этой поверхности может находиться в
двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка
имеет восемь соседей, окружающих её. Распределение живых клеток в начале игры
называется первым поколением. Каждое следующее поколение рассчитывается на
основе предыдущего по таким правилам: в пустой (мёртвой) клетке, рядом с которой
ровно три живые клетки, зарождается жизнь; если у живой клетки есть две или три
живые соседки, то эта клетка продолжает жить; в противном случае, если соседей
меньше двух или больше трёх, клетка умирает («от одиночества» или «от
перенаселённости») Игра прекращается, если на поле не останется ни одной «живой»
клетки конфигурация на очередном шаге в точности (без сдвигов и поворотов)
повторит себя же на одном из более ранних шагов (складывается периодическая
конфигурация) при очередном шаге ни одна из клеток не меняет своего состояния
(складывается стабильная конфигурация; предыдущее правило, вырожденное до одного
шага назад) Эти простые правила приводят к огромному разнообразию форм, которые
могут возникнуть в игре.

Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует
начальную конфигурацию «живых» клеток, которые затем взаимодействуют согласно
правилам уже без его участия (он является наблюдателем).

В компьютерных реализациях игры поле ограничено и (как правило) верхняя граница
поля «соединена» с нижней, а левая граница — с правой, что представляет собой
эмуляцию поверхности тора, но на экране поле всегда отображается в виде
равномерной сетки.

Простейший алгоритм «смены поколения» последовательно просматривает все ячейки
решётки и для каждой ячейки подсчитывает соседей, определяя судьбу каждой клетки
(не изменится, умрёт, родится). Такой простейший алгоритм использует два
двумерных массива — один для текущего поколения, второй — для следующего.

Более сложный, но и более быстрый алгоритм составляет списки клеток для
просмотра в последующем поколении; клетки, которые не могут измениться, в списки
не вносятся. Например, если какая-либо клетка и ни одна из её соседей не
поменялись на предыдущем ходу, то эта клетка не поменяется и на текущем ходу.