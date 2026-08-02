/*
# Seed launcher data

Populates all tables with the content currently shown in the launcher UI so the
frontend can switch from hardcoded arrays to live database reads. Uses
ON CONFLICT DO NOTHING so re-running is safe.
*/

-- ============================================================
-- servers
-- ============================================================
INSERT INTO servers (name, ip, online, players, max_players, ping, sort_order) VALUES
  ('Moscow Project | Main', 'play.moscowproject.ru:7777', true, 847, 1000, 24, 0),
  ('Moscow Project | RP',   'rp.moscowproject.ru:7777',   true, 412, 500,  31, 1),
  ('Moscow Project | Test', 'test.moscowproject.ru:7777', false, 0,  100,  0,  2)
ON CONFLICT DO NOTHING;

-- ============================================================
-- news
-- ============================================================
INSERT INTO news (title, excerpt, body, category, image_url, published_at) VALUES
  (
    'Большое обновление 1.8.0 — Новый район и авто',
    'Добавлен район Останкино, 14 новых машин, переработанная экономика и система гаражей. Читайте подробности в патчноутах.',
    'Полный текст патчноута: добавлен район Останкино с 14 новыми автомобилями, переработанной экономикой и системой гаражей 2.0. Исправлено более 40 багов.',
    'Обновление',
    'https://images.pexels.com/photos/5058117/pexels-photo-5058117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '2026-07-30'
  ),
  (
    'Ивент «Ночь на Арбате» — двойной опыт',
    'Все выходные на сервере Main действует двойной опыт и увеличенный заработок. Собирайте команду и заходите в игру.',
    'В ближайшие выходные на сервере Main действует двойной опыт и увеличенный заработок. Собирайте команду и заходите в игру.',
    'Событие',
    'https://images.pexels.com/photos/417374/pexels-photo-417374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '2026-07-26'
  ),
  (
    'Конкурс скриншотов: победители недели',
    'Подведены итоги недельного конкурса. Лучшие работы уже доступны в разделе «Медиа». Призовой фонд — 50 000 игровых очков.',
    'Подведены итоги недельного конкурса скриншотов. Лучшие работы доступны в разделе «Медиа». Призовой фонд — 50 000 игровых очков.',
    'Новость',
    'https://images.pexels.com/photos/16763374/pexels-photo-16763374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '2026-07-22'
  ),
  (
    'Скидки на премиум-аккаунт до 40%',
    'Только до конца месяца — премиум-статус со скидкой. Ускоренный заработок, эксклюзивные авто и приоритет в очереди.',
    'Только до конца месяца — премиум-статус со скидкой до 40%. Ускоренный заработок, эксклюзивные авто и приоритет в очереди.',
    'Акция',
    'https://images.pexels.com/photos/9932440/pexels-photo-9932440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '2026-07-18'
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- media
-- ============================================================
INSERT INTO media (image_url, caption, sort_order) VALUES
  ('https://images.pexels.com/photos/5058117/pexels-photo-5058117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Москва ночью', 0),
  ('https://images.pexels.com/photos/417374/pexels-photo-417374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Набережная', 1),
  ('https://images.pexels.com/photos/16763374/pexels-photo-16763374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Лужники', 2),
  ('https://images.pexels.com/photos/9932440/pexels-photo-9932440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Город на закате', 3),
  ('https://images.pexels.com/photos/10121239/pexels-photo-10121239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Туман над городом', 4),
  ('https://images.pexels.com/photos/29183526/pexels-photo-29183526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Ночной мост', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- events
-- ============================================================
INSERT INTO events (title, event_date, type) VALUES
  ('Гонка по ночному городу', '2 авг, 20:00', 'Событие'),
  ('Турнир по дрифту',        '5 авг, 19:00', 'Событие'),
  ('Собрание банд',            '8 авг, 21:00', 'Событие')
ON CONFLICT DO NOTHING;

-- ============================================================
-- players
-- ============================================================
INSERT INTO players (name, score, rank) VALUES
  ('DonVito',    2840500, 1),
  ('BlackHawk',  2109800, 2),
  ('Nevsky',     1988200, 3),
  ('Kuznetsov',  1754000, 4),
  ('Sokol',      1621400, 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- update_files
-- ============================================================
INSERT INTO update_files (path, size, required, status) VALUES
  ('samp.dll',             3145728,    true, 'done'),
  ('config.ini',           2048,       true, 'done'),
  ('assets/textures.vfs',  184549376,  true, 'pending'),
  ('assets/models.vfs',    268435456,  true, 'pending'),
  ('assets/audio.vfs',     67108864,   true, 'pending'),
  ('data/maps.bin',        8388608,    true, 'pending')
ON CONFLICT DO NOTHING;

-- ============================================================
-- launcher_stats
-- ============================================================
INSERT INTO launcher_stats (label, value, icon, sort_order) VALUES
  ('Игроков онлайн',       '1 259', 'Users',       0),
  ('Серверов',             '3',     'Signal',      1),
  ('Рекорд онлайна',       '2 104', 'TrendingUp',  2),
  ('Аптайм',               '99.8%', 'Clock',       3),
  ('Всего игроков',        '34 820','Users',       4),
  ('Сообщений за день',    '12 490','MessageCircle',5),
  ('Сыграно матчей',       '8 914', 'Trophy',      6)
ON CONFLICT DO NOTHING;
