# API спецификация для AI Books

## Базовый URL
```
https://api.aibooks.com/v1
```

## Аутентификация
Все запросы (кроме публичных) требуют заголовок:
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Auth (Аутентификация)

### POST /auth/register
Регистрация нового пользователя

**Request:**
```json
{
  "email": "user@example.com",
  "phone": "+79991234567",
  "password": "SecurePass123!",
  "first_name": "Иван",
  "last_name": "Иванов"
}
```

**Response (201):**
```json
{
  "user_id": 12345,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_at": "2024-12-31T23:59:59Z"
}
```

### POST /auth/login
Вход пользователя

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "user_id": 12345,
  "email": "user@example.com",
  "role": "client",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_at": "2024-12-31T23:59:59Z"
}
```

### POST /auth/logout
Выход пользователя

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### POST /auth/refresh
Обновление токена

**Request:**
```
Authorization: Bearer <refresh_token>
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_at": "2024-12-31T23:59:59Z"
}
```

### POST /auth/forgot-password
Запрос сброса пароля

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

### POST /auth/reset-password
Сброс пароля

**Request:**
```json
{
  "token": "reset_token_from_email",
  "new_password": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password successfully reset"
}
```

---

## 👤 Users (Пользователи)

### GET /users/me
Получение данных текущего пользователя

**Response (200):**
```json
{
  "id": 12345,
  "email": "user@example.com",
  "phone": "+79991234567",
  "first_name": "Иван",
  "last_name": "Иванов",
  "avatar_url": "https://cdn.aibooks.com/avatars/12345.jpg",
  "role": "client",
  "is_verified": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### PUT /users/me
Обновление данных пользователя

**Request:**
```json
{
  "first_name": "Иван",
  "last_name": "Петров",
  "phone": "+79991234567"
}
```

**Response (200):**
```json
{
  "id": 12345,
  "email": "user@example.com",
  "first_name": "Иван",
  "last_name": "Петров",
  "phone": "+79991234567"
}
```

### POST /users/me/avatar
Загрузка аватара

**Request:** `multipart/form-data` с файлом `avatar`

**Response (200):**
```json
{
  "avatar_url": "https://cdn.aibooks.com/avatars/12345.jpg"
}
```

---

## 📚 Books (Книги)

### GET /books/genres
Получение списка жанров по возрастной группе

**Query Parameters:**
- `age_group`: "0-7" | "7-12" | "12-18" (required)

**Response (200):**
```json
{
  "age_group": "0-7",
  "genres": [
    {
      "id": "alphabet",
      "name": "Алфавит",
      "description": "Изучение букв и звуков"
    },
    {
      "id": "numbers",
      "name": "Цифры",
      "description": "Учимся считать от 0 до 100"
    }
  ]
}
```

### GET /books/heroes
Получение списка героев

**Query Parameters:**
- `type`: "main" | "companion" | "secondary"
- `category`: "family" | "fantasy" | "animals" | etc.

**Response (200):**
```json
{
  "heroes": [
    {
      "id": "dinosaur",
      "name": "Динозавр",
      "category": "fantasy",
      "image_url": "https://cdn.aibooks.com/heroes/dinosaur.png"
    },
    {
      "id": "princess",
      "name": "Принцесса",
      "category": "fantasy",
      "image_url": "https://cdn.aibooks.com/heroes/princess.png"
    }
  ]
}
```

### GET /books/locations
Получение списка мест действия

**Response (200):**
```json
{
  "locations": [
    {
      "id": "forest",
      "name": "Лес",
      "image_url": "https://cdn.aibooks.com/locations/forest.png"
    },
    {
      "id": "school",
      "name": "Школа",
      "image_url": "https://cdn.aibooks.com/locations/school.png"
    }
  ]
}
```

### GET /books/color-schemes
Получение цветовых схем

**Response (200):**
```json
{
  "color_schemes": [
    {
      "id": "mint_peach",
      "name": "Мятный и Персиковый",
      "colors": {
        "primary": "#98FF98",
        "secondary": "#FFDAB9",
        "background": "#FFFFFF"
      }
    },
    {
      "id": "cream_brown_gold",
      "name": "Сливочный, Коричневый, Золотой",
      "colors": {
        "primary": "#FFFDD0",
        "secondary": "#8B4513",
        "accent": "#FFD700"
      }
    }
  ]
}
```

---

## 🛒 Orders (Заказы)

### GET /orders
Получение списка заказов пользователя

**Query Parameters:**
- `status`: filter by status
- `page`: page number (default: 1)
- `limit`: items per page (default: 10)

**Response (200):**
```json
{
  "orders": [
    {
      "id": 1001,
      "status": "processing",
      "total_amount": 2500.00,
      "payment_status": "paid",
      "created_at": "2024-01-15T10:30:00Z",
      "items_count": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

### GET /orders/:id
Получение деталей заказа

**Response (200):**
```json
{
  "id": 1001,
  "status": "processing",
  "total_amount": 2500.00,
  "payment_status": "paid",
  "delivery_address": "г. Москва, ул. Примерная, д. 1",
  "delivery_phone": "+79991234567",
  "created_at": "2024-01-15T10:30:00Z",
  "books": [
    {
      "id": 501,
      "title": "Приключения в лесу",
      "age_group": "0-7",
      "genre": "animals",
      "format": "both",
      "page_count": 20,
      "color_scheme": "mint_peach",
      "heroes": [...],
      "locations": [...]
    }
  ]
}
```

### POST /orders
Создание нового заказа

**Request:**
```json
{
  "books": [
    {
      "age_group": "0-7",
      "genre": "animals",
      "title": "Приключения в лесу",
      "page_count": 20,
      "format": "both",
      "audio_enabled": true,
      "color_scheme": "mint_peach",
      "heroes": [
        {
          "hero_type": "main",
          "hero_category": "child",
          "name": "Саша",
          "photo_url": "https://cdn.aibooks.com/photos/child.jpg"
        },
        {
          "hero_type": "companion",
          "hero_category": "dinosaur",
          "name": "Дино"
        }
      ],
      "locations": [
        {
          "location_type": "forest"
        }
      ]
    }
  ],
  "delivery_address": "г. Москва, ул. Примерная, д. 1",
  "delivery_phone": "+79991234567"
}
```

**Response (201):**
```json
{
  "order_id": 1001,
  "status": "pending",
  "total_amount": 2500.00,
  "payment_url": "https://payment.gateway.com/pay/xxx"
}
```

### POST /orders/:id/cancel
Отмена заказа

**Response (200):**
```json
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

---

## 📝 Drafts (Черновики)

### GET /drafts
Получение списка черновиков

**Response (200):**
```json
{
  "drafts": [
    {
      "id": 301,
      "book_data": {
        "age_group": "0-7",
        "genre": "alphabet",
        "title": "Азбука Саши"
      },
      "saved_at": "2024-01-14T15:00:00Z"
    }
  ]
}
```

### GET /drafts/:id
Получение черновика

**Response (200):**
```json
{
  "id": 301,
  "book_data": {
    "age_group": "0-7",
    "genre": "alphabet",
    "title": "Азбука Саши",
    "heroes": [...],
    "locations": [...]
  },
  "saved_at": "2024-01-14T15:00:00Z"
}
```

### POST /drafts
Сохранение черновика

**Request:**
```json
{
  "book_data": {
    "age_group": "0-7",
    "genre": "alphabet",
    "title": "Азбука Саши",
    "heroes": [...],
    "locations": [...]
  }
}
```

**Response (201):**
```json
{
  "id": 301,
  "saved_at": "2024-01-14T15:00:00Z"
}
```

### PUT /drafts/:id
Обновление черновика

**Request:** (аналогично POST /drafts)

**Response (200):**
```json
{
  "id": 301,
  "saved_at": "2024-01-14T16:00:00Z"
}
```

### DELETE /drafts/:id
Удаление черновика

**Response (200):**
```json
{
  "success": true
}
```

---

## 💳 Payments (Платежи)

### POST /payments/initiate
Инициация платежа

**Request:**
```json
{
  "order_id": 1001,
  "payment_method": "card"
}
```

**Response (200):**
```json
{
  "payment_url": "https://payment.gateway.com/pay/xxx",
  "transaction_id": "txn_123456"
}
```

### POST /payments/webhook
Webhook от платежной системы (внутренний эндпоинт)

**Request:**
```json
{
  "transaction_id": "txn_123456",
  "status": "success",
  "amount": 2500.00
}
```

---

## 🎧 Support (Поддержка)

### GET /support/tickets
Получение списка тикетов пользователя

**Response (200):**
```json
{
  "tickets": [
    {
      "id": 501,
      "subject": "Вопрос по заказу #1001",
      "status": "open",
      "priority": "medium",
      "created_at": "2024-01-15T12:00:00Z"
    }
  ]
}
```

### POST /support/tickets
Создание тикета

**Request:**
```json
{
  "subject": "Вопрос по заказу #1001",
  "message": "Здравствуйте, когда мой заказ будет отправлен?",
  "priority": "medium"
}
```

**Response (201):**
```json
{
  "ticket_id": 501,
  "status": "open",
  "created_at": "2024-01-15T12:00:00Z"
}
```

### GET /support/tickets/:id
Получение тикета с сообщениями

**Response (200):**
```json
{
  "id": 501,
  "subject": "Вопрос по заказу #1001",
  "status": "in_progress",
  "messages": [
    {
      "sender": "user",
      "message": "Здравствуйте, когда мой заказ будет отправлен?",
      "created_at": "2024-01-15T12:00:00Z"
    },
    {
      "sender": "support",
      "message": "Добрый день! Ваш заказ готовится к отправке.",
      "created_at": "2024-01-15T14:00:00Z"
    }
  ]
}
```

### POST /support/tickets/:id/messages
Добавление сообщения в тикет

**Request:**
```json
{
  "message": "Спасибо за ответ!"
}
```

**Response (201):**
```json
{
  "message_id": 1001,
  "created_at": "2024-01-15T15:00:00Z"
}
```

### GET /support/faq
Получение FAQ

**Query Parameters:**
- `category`: filter by category

**Response (200):**
```json
{
  "faq": [
    {
      "id": 1,
      "category": "orders",
      "question": "Как долго изготавливается книга?",
      "answer": "PDF версия формируется в течение 24 часов..."
    }
  ]
}
```

---

## ⭐ Reviews (Отзывы)

### GET /reviews
Получение отзывов (публичный эндпоинт)

**Query Parameters:**
- `page`: page number
- `limit`: items per page
- `approved_only`: true (default)

**Response (200):**
```json
{
  "reviews": [
    {
      "id": 201,
      "rating": 5,
      "comment": "Отличная книга! Ребенок в восторге!",
      "photos": ["https://cdn.aibooks.com/reviews/photo1.jpg"],
      "created_at": "2024-01-10T10:00:00Z"
    }
  ]
}
```

### POST /reviews
Создание отзыва

**Request:**
```json
{
  "order_id": 1001,
  "rating": 5,
  "comment": "Отличная книга! Ребенок в восторге!",
  "photos": ["base64_encoded_image_1", "base64_encoded_image_2"]
}
```

**Response (201):**
```json
{
  "review_id": 201,
  "status": "pending_approval"
}
```

---

## 🎁 Certificates (Сертификаты)

### GET /certificates
Получение сертификатов пользователя

**Response (200):**
```json
{
  "certificates": [
    {
      "code": "CERT-ABC123",
      "amount": 1000.00,
      "balance": 1000.00,
      "expiry_date": "2024-12-31",
      "is_used": false
    }
  ]
}
```

### POST /certificates/activate
Активация сертификата

**Request:**
```json
{
  "code": "CERT-ABC123"
}
```

**Response (200):**
```json
{
  "certificate": {
    "code": "CERT-ABC123",
    "amount": 1000.00,
    "balance": 1000.00,
    "expiry_date": "2024-12-31"
  }
}
```

---

## 🔔 Notifications (Уведомления)

### GET /notifications
Получение уведомлений пользователя

**Query Parameters:**
- `unread_only`: true/false
- `page`: page number
- `limit`: items per page

**Response (200):**
```json
{
  "notifications": [
    {
      "id": 301,
      "type": "email",
      "channel": "order_status",
      "title": "Статус заказа изменён",
      "message": "Ваш заказ #1001 отправлен в печать",
      "is_sent": true,
      "sent_at": "2024-01-15T16:00:00Z"
    }
  ]
}
```

### PUT /notifications/:id/read
Отметить уведомление как прочитанное

**Response (200):**
```json
{
  "success": true
}
```

---

## 🤖 AI Generation (Генерация ИИ)

### POST /ai/generate/story
Генерация истории

**Request:**
```json
{
  "book_id": 501,
  "age_group": "0-7",
  "genre": "animals",
  "heroes": [...],
  "locations": [...],
  "page_count": 20
}
```

**Response (202):**
```json
{
  "job_id": "job_abc123",
  "status": "pending",
  "estimated_time": 300
}
```

### GET /ai/jobs/:job_id
Получение статуса задания генерации

**Response (200):**
```json
{
  "job_id": "job_abc123",
  "job_type": "story",
  "status": "completed",
  "progress": 100,
  "result_url": "https://cdn.aibooks.com/books/501/story.pdf",
  "completed_at": "2024-01-15T17:00:00Z"
}
```

---

## ❌ Error Responses

### Стандартный формат ошибок

**400 Bad Request:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Неверные данные в запросе",
    "details": [
      {
        "field": "email",
        "message": "Некорректный формат email"
      }
    ]
  }
}
```

**401 Unauthorized:**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Требуется аутентификация"
  }
}
```

**403 Forbidden:**
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Недостаточно прав для выполнения действия"
  }
}
```

**404 Not Found:**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Ресурс не найден"
  }
}
```

**409 Conflict:**
```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Email уже зарегистрирован"
  }
}
```

**500 Internal Server Error:**
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Внутренняя ошибка сервера",
    "request_id": "req_xyz789"
  }
}
```

---

## 📊 Rate Limiting

- **Standard:** 100 requests per minute
- **AI Generation:** 10 requests per hour

Headers in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

---

## 🔄 Webhooks

### События вебхуков

1. `order.created` - Создан новый заказ
2. `order.paid` - Заказ оплачен
3. `order.shipped` - Заказ отправлен
4. `book.generated` - Книга сгенерирована
5. `support.ticket_created` - Создан тикет поддержки
