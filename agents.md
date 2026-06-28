# AI Chat (Groq) - Design System

> Version: 1.0.0
> Type: Frontend Only
> Framework: React + Vite + TypeScript
> Purpose: Personal AI Chat menggunakan Groq API

---

# 1. Project Overview

Aplikasi AI Chat sederhana untuk penggunaan pribadi yang menggunakan Groq API secara langsung dari frontend.

Karakteristik:

- Frontend Only
- Tanpa Backend
- Tanpa Database
- Login menggunakan Email & Password dari `.env`
- Chat History menggunakan Local Storage
- Limit 5 Prompt per Hari
- Menggunakan Streaming Response
- Responsive Desktop & Mobile

---

# 2. Technology Stack

- React 19
- Vite
- TypeScript
- TailwindCSS
- React Router
- React Markdown
- Lucide React
- Groq SDK

---

# 3. Environment Variables

```env
VITE_GROQ_API_KEY=

VITE_LOGIN_EMAIL=imamariadi775@gmail.com
VITE_LOGIN_PASSWORD=persib1933

VITE_MODEL=llama-3.3-70b-versatile

VITE_MAX_PROMPT_PER_DAY=5
```

---

# 4. Folder Structure

```text
src/

components/

    auth/

        LoginCard.tsx

    chat/

        ChatHeader.tsx

        ChatBubble.tsx

        ChatInput.tsx

        PromptCounter.tsx

        LoadingBubble.tsx

hooks/

    useAuth.ts

    useChat.ts

    usePromptLimit.ts

layout/

    MainLayout.tsx

pages/

    Login.tsx

    Chat.tsx

services/

    groq.ts

storage/

    auth.ts

    history.ts

    prompt.ts

config/

    env.ts

types/

utils/

App.tsx

main.tsx
```

---

# 5. Application Flow

```text
Application

↓

Check Login

↓

Login

↓

Save Login

↓

Open Chat

↓

Load Prompt Counter

↓

Load Chat History

↓

User Send Prompt

↓

Groq API

↓

Streaming Response

↓

Save History

↓

Increase Daily Counter
```

---

# 6. Authentication

Authentication hanya digunakan sebagai proteksi ringan untuk penggunaan pribadi.

Credential berasal dari Environment Variable.

Flow

```text
Login

↓

Input Email

↓

Input Password

↓

Compare ENV

↓

Success

↓

localStorage

↓

Redirect Chat
```

Storage

```json
{
    "isLogin": true
}
```

---

# 7. Prompt Limit

Maximum Prompt

```
5 Prompt / Hari
```

Flow

```text
User Send Prompt

↓

Read Prompt Counter

↓

Check Date

↓

Same Date

↓

count++

↓

count >= limit

↓

Disable Chat Input
```

Jika tanggal berubah

```text
Reset Counter

↓

count = 0
```

Storage

```json
{
    "date": "2026-06-28",
    "count": 2
}
```

---

# 8. Chat Flow

```text
Input Prompt

↓

Add User Bubble

↓

Loading Bubble

↓

Call Groq

↓

Streaming Token

↓

Assistant Bubble

↓

Save Chat History
```

---

# 9. Local Storage

```text
auth

chat_history

prompt_limit
```

---

# 10. Chat History Format

```json
[
    {
        "role":"user",
        "content":"Halo"
    },
    {
        "role":"assistant",
        "content":"Halo juga"
    }
]
```

---

# 11. Routing

```text
/

↓

Login

/chat

↓

Chat
```

---

# 12. UI Layout

```text
+--------------------------------------------------+

 AI Chat                               Logout

----------------------------------------------------

 Prompt Today

 2 / 5

----------------------------------------------------

 User Bubble

 AI Bubble

 User Bubble

 AI Bubble

----------------------------------------------------

 [............................................]

                          [ Send ]

+--------------------------------------------------+
```

---

# 13. Components

## Login

- Email
- Password
- Login Button

---

## Header

- Application Title
- Logout Button

---

## Prompt Counter

Display

```
Prompt Today

2 / 5
```

Jika mencapai limit

```
5 / 5
```

warna merah.

---

## Chat Bubble

Support

- Markdown
- Code Block
- Ordered List
- Bullet List

---

## Loading Bubble

Display

```
Thinking...
```

---

## Chat Input

Support

- Multiline Textarea
- Enter to Send
- Shift + Enter New Line

---

# 14. Hooks

## useAuth

Functions

```
login()

logout()

isLogin()
```

---

## usePromptLimit

Functions

```
increase()

remaining()

reset()

isExceeded()
```

---

## useChat

Functions

```
send()

clear()

messages

loading
```

---

# 15. Services

## groq.ts

Responsible

- Initialize Groq Client
- Send Prompt
- Receive Stream
- Return Response

---

# 16. Config

All configuration comes from `.env`

```
EMAIL

PASSWORD

MODEL

MAX_PROMPT
```

---

# 17. Theme

## Colors

Primary

```
#2563EB
```

Background

```
#0F172A
```

Surface

```
#1E293B
```

Border

```
#334155
```

User Bubble

```
Blue
```

Assistant Bubble

```
Gray
```

Success

```
Green
```

Danger

```
Red
```

---

# 18. Responsive

Desktop

```
Max Width

900px
```

Mobile

```
100%
```

Chat selalu memenuhi tinggi layar.

---

# 19. Error Handling

Wrong Login

```
Invalid Email or Password
```

Prompt Limit

```
Daily Prompt Limit Reached
```

Groq Error

```
Unable to contact AI.

Please try again.
```

---

# 20. Logout

Flow

```text
Logout

↓

Remove Local Storage

↓

Redirect Login
```

---

# 21. MVP User Journey

```text
Open Application

↓

Login

↓

Open Chat

↓

Type Prompt

↓

Groq Response

↓

Prompt Counter +1

↓

History Saved

↓

Repeat

↓

Prompt = 5

↓

Chat Disabled

↓

Tomorrow

↓

Counter Reset

↓

Chat Enabled
```

---

# 22. Future Enhancement

- Multiple Conversation
- Theme Switch
- Export Chat (.md)
- Import Chat
- Prompt Templates
- Conversation Search
- Model Switch
- Temperature Settings
- Max Token Settings
- Clear History
- Reset Prompt Counter
- Dark / Light Theme