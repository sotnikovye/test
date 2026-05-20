# Схема базы данных для AI Books

## Таблицы

### 1. users (Пользователи)
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
email           VARCHAR(255) UNIQUE NOT NULL
phone           VARCHAR(20) UNIQUE NOT NULL
password_hash   VARCHAR(255) NOT NULL
first_name      VARCHAR(100)
last_name       VARCHAR(100)
role            ENUM('guest', 'client', 'admin') DEFAULT 'client'
avatar_url      VARCHAR(500)
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
is_verified     BOOLEAN DEFAULT FALSE
```

### 2. orders (Заказы)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL FOREIGN KEY REFERENCES users(id)
status              ENUM('draft', 'pending', 'paid', 'processing', 'printing', 'shipped', 'delivered', 'cancelled')
total_amount        DECIMAL(10, 2)
payment_method      VARCHAR(50)
payment_status      ENUM('pending', 'paid', 'failed', 'refunded')
delivery_address    TEXT
delivery_phone      VARCHAR(20)
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
completed_at        TIMESTAMP NULL
```

### 3. books (Книги)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
order_id            BIGINT NOT NULL FOREIGN KEY REFERENCES orders(id)
age_group           ENUM('0-7', '7-12', '12-18') NOT NULL
genre               VARCHAR(100) NOT NULL
title               VARCHAR(255)
page_count          INT DEFAULT 20
format              ENUM('pdf', 'print', 'both') NOT NULL
audio_enabled       BOOLEAN DEFAULT FALSE
music_file_url      VARCHAR(500)
ai_greeting_enabled BOOLEAN DEFAULT FALSE
ai_cartoon_enabled  BOOLEAN DEFAULT FALSE
color_scheme        ENUM('mint_peach', 'cream_brown_gold', 'white_raspberry_pistachio')
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 4. book_heroes (Герои книги)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
book_id             BIGINT NOT NULL FOREIGN KEY REFERENCES books(id)
hero_type           ENUM('main', 'companion', 'secondary') NOT NULL
hero_category       VARCHAR(50) NOT NULL  -- 'parent', 'sibling', 'friend', 'dinosaur', 'princess', etc.
name                VARCHAR(100)
photo_url           VARCHAR(500)
description         TEXT
sort_order          INT DEFAULT 0
```

### 5. book_locations (Места действия)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
book_id             BIGINT NOT NULL FOREIGN KEY REFERENCES books(id)
location_type       VARCHAR(100) NOT NULL  -- 'forest', 'garden', 'school', etc.
description         TEXT
sort_order          INT DEFAULT 0
```

### 6. order_items (Элементы заказа)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
order_id            BIGINT NOT NULL FOREIGN KEY REFERENCES orders(id)
book_id             BIGINT FOREIGN KEY REFERENCES books(id)
product_type        ENUM('book_pdf', 'book_print', 'audiobook', 'music_addon', 'ai_greeting', 'ai_cartoon')
quantity            INT DEFAULT 1
unit_price          DECIMAL(10, 2)
total_price         DECIMAL(10, 2)
```

### 7. drafts (Черновики)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL FOREIGN KEY REFERENCES users(id)
book_data           JSON NOT NULL  -- Полные данные книги в формате JSON
saved_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 8. support_tickets (Тикеты поддержки)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT FOREIGN KEY REFERENCES users(id)
subject             VARCHAR(255) NOT NULL
message             TEXT NOT NULL
status              ENUM('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')
priority            ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium'
assigned_to         BIGINT FOREIGN KEY REFERENCES users(id)  -- admin user
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
resolved_at         TIMESTAMP NULL
```

### 9. support_messages (Сообщения поддержки)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
ticket_id           BIGINT NOT NULL FOREIGN KEY REFERENCES support_tickets(id)
sender_id           BIGINT FOREIGN KEY REFERENCES users(id)
message             TEXT NOT NULL
is_internal         BOOLEAN DEFAULT FALSE  -- Внутренние заметки админов
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 10. reviews (Отзывы)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL FOREIGN KEY REFERENCES users(id)
order_id            BIGINT FOREIGN KEY REFERENCES orders(id)
rating              INT CHECK (rating >= 1 AND rating <= 5)
comment             TEXT
photos              JSON  -- Массив URL фотографий
is_approved         BOOLEAN DEFAULT FALSE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 11. faq (Частые вопросы)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
category            VARCHAR(100)
question            TEXT NOT NULL
answer              TEXT NOT NULL
sort_order          INT DEFAULT 0
is_active           BOOLEAN DEFAULT TRUE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

### 12. certificates (Сертификаты)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
code                VARCHAR(50) UNIQUE NOT NULL
user_id             BIGINT FOREIGN KEY REFERENCES users(id)
amount              DECIMAL(10, 2) NOT NULL
balance             DECIMAL(10, 2) NOT NULL
expiry_date         DATE NOT NULL
is_used             BOOLEAN DEFAULT FALSE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 13. notifications (Уведомления)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL FOREIGN KEY REFERENCES users(id)
type                ENUM('email', 'sms', 'push') NOT NULL
channel             VARCHAR(50) NOT NULL  -- 'order_status', 'payment', 'support', 'promo'
title               VARCHAR(255)
message             TEXT NOT NULL
is_sent             BOOLEAN DEFAULT FALSE
sent_at             TIMESTAMP NULL
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### 14. print_orders (Заказы в типографию)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
order_id            BIGINT NOT NULL FOREIGN KEY REFERENCES orders(id)
printer_id          VARCHAR(100)  -- ID в системе типографии
status              ENUM('pending', 'sent', 'confirmed', 'printing', 'ready', 'shipped')
tracking_number     VARCHAR(100)
sent_at             TIMESTAMP NULL
confirmed_at        TIMESTAMP NULL
ready_at            TIMESTAMP NULL
notes               TEXT
```

### 15. payment_transactions (Платежные транзакции)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
order_id            BIGINT NOT NULL FOREIGN KEY REFERENCES orders(id)
transaction_id      VARCHAR(255) UNIQUE  -- ID от платежной системы
amount              DECIMAL(10, 2) NOT NULL
currency            VARCHAR(3) DEFAULT 'RUB'
status              ENUM('pending', 'success', 'failed', 'refunded')
payment_method      VARCHAR(50)
error_message       TEXT
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
processed_at        TIMESTAMP NULL
```

### 16. ai_generation_jobs (Задания генерации ИИ)
```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
book_id             BIGINT NOT NULL FOREIGN KEY REFERENCES books(id)
job_type            ENUM('story', 'image', 'audio', 'cartoon', 'greeting')
status              ENUM('pending', 'processing', 'completed', 'failed')
progress            INT DEFAULT 0
result_url          VARCHAR(500)
error_message       TEXT
retry_count         INT DEFAULT 0
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
completed_at        TIMESTAMP NULL
```

## Индексы

```sql
-- Оптимизация поиска
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_books_order_id ON books(order_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_payment_transactions_order_id ON payment_transactions(order_id);
```

## Связи между таблицами

```
users (1) ──────< (N) orders
users (1) ──────< (N) drafts
users (1) ──────< (N) support_tickets
users (1) ──────< (N) reviews
users (1) ──────< (N) certificates
users (1) ──────< (N) notifications

orders (1) ────< (N) books
orders (1) ────< (N) order_items
orders (1) ────< (1) print_orders
orders (1) ────< (N) payment_transactions

books (1) ────< (N) book_heroes
books (1) ────< (N) book_locations
books (1) ────< (N) ai_generation_jobs

support_tickets (1) ────< (N) support_messages
```
