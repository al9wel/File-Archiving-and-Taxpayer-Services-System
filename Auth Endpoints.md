---
title: Default module
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# Default module

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Archive_Files_Taxpayer_Services/Users/Auth_Users

## POST Login

POST /api/login

> Body Parameters

```yaml
userName: AbdullahBawazir
password: "12345678"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|Content-Type|header|string| no |none|
|body|body|object| yes |none|
|» userName|body|string| no |none|
|» password|body|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Create_User

POST /api/create-user

> Body Parameters

```yaml
firstName: Salem
lastName: Alswil
dateOfBirth: 2003-10-11
idCard: file://C:\Users\Asiana\Desktop\test.pdf
phone: "47293637"
role: Manager
departmentID: "1"
image: file://C:\Users\Asiana\Pictures\profile.jpg

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» firstName|body|string| no |none|
|» lastName|body|string| no |none|
|» dateOfBirth|body|string| no |none|
|» idCard|body|string(binary)| no |none|
|» phone|body|string| no |none|
|» role|body|string| no |none|
|» departmentID|body|string| no |none|
|» image|body|string(binary)| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Logout

POST /api/logout

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Reset_Password

POST /api/reset-password

> Body Parameters

```yaml
new_password: sa123456
new_password_confirmation: sa123456

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» new_password|body|string| no |none|
|» new_password_confirmation|body|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

