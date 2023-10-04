This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

# Quotes and Authors REST API

This API provides access to a collection of quotes and authors.

## Endpoints

### 1. List Quotes

**Endpoint:** `/api/quotes`

**Method:** `GET`

**Query Parameters**

| Parameter   | Required | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| `offset`    | No       | Offset for pagination (default: 0)            |
| `limit`     | No       | Limit for pagination (default: 10)            |
| `author_id` | No       | Filters the quotes by the specified author_id |

**Response**

| Field     | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| `offset`  | Number | The starting point for pagination                                  |
| `limit`   | Number | The maximum number of quotes to retrieve                           |
| `results` | Array  | An array of quote objects ([Quote Object](#api/quotes/[quote_id])) |
| `total`   | Number | The total number of quotes available                               |

### <a id="api/quotes/[quote_id]"></a> 2. Get Quote by ID

**Endpoint:** `/api/quotes/[quote_id]`

**Method:** `GET`

**Response**

| Field        | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `id`         | Number | The unique identifier for the quote  |
| `quote`      | String | The text of the quote                |
| `author_id`  | Number | The unique identifier for the author |
| `first_name` | String | The first name of the author         |
| `last_name`  | String | The last name of the author          |
| `image_url`  | String | The URL of the author's image        |

### 3. Get Random Quote

**Endpoint:** `/api/quotes/random`

**Method:** `GET`

**Query Parameters**

| Parameter  | Required | Description                               |
| ---------- | -------- | ----------------------------------------- |
| `quote_id` | No       | Quote ID to exclude from random selection |

**Response**

[Quote Object](#api/quotes/[quote_id])

### 4. List Authors

**Endpoint:** `/api/authors/`

**Method:** `GET`

**Query Parameters**

| Parameter | Required | Description                        |
| --------- | -------- | ---------------------------------- |
| `offset`  | No       | Offset for pagination (default: 0) |
| `limit`   | No       | Limit for pagination (default: 10) |

**Response**

| Field     | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| `offset`  | Number | The starting point for pagination                                      |
| `limit`   | Number | The maximum number of authors to retrieve                              |
| `results` | Array  | An array of author objects ([Author object](#api/authors/[author_id])) |
| `total`   | Number | The total number of authors available                                  |

### <a id="api/authors/[author_id]"></a> 5. Get Author by ID

**Endpoint:** `/api/authors/[author_id]`

**Method:** `GET`

**Response:**

| Field        | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `id`         | Number | The unique identifier for the author |
| `first_name` | String | The first name of the author         |
| `last_name`  | String | The last name of the author          |
| `image_url`  | String | The URL of the author's image        |
