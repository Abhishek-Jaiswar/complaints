#  Database Connection

This project uses **MongoDB** with Mongoose to store and manage complaints and user data.

---

## **How it works**

- Mongoose is used for defining models (`User`, `Complaint`).
- A `connectDb` helper function is used to ensure a single DB connection.

---

## **Setup**

1. **Create a MongoDB Atlas account (recommended)**  
   [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster**, get your **connection string**, e.g.

```

mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true\&w=majority

```

3. **Add it to your `.env`**

```env
MONGODB_URI=your_mongodb_uri_here
```

---

## **Connect your DB**

`/lib/database.ts`:

```ts
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI || "";

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
```

---

## **Explanation**

In the above **`/lib/database.ts`** connection utility, I’m using **Mongoose** to connect to a MongoDB database.  
Here’s how it works and why it’s written this way:

- **Environment Variable:**  
  The `MONGODB_URI` is loaded from your `.env` file to keep your DB credentials secure and out of code.

- **Connection Caching:**  
  During development, Next.js **hot reloads** can cause multiple connections to open.  
  The `cached` object ensures that only **one connection** is reused across reloads — avoiding **connection saturation**.

- **Singleton Pattern:**  
  If `cached.conn` exists, the function returns the **existing connection**.  
  If not, it creates a **new connection**, caches it, and returns it.

This pattern is widely used for **Next.js apps**.

---

## **Use it in API routes**

Example in `route.ts`:

```ts
import connectDb from "@/lib/database";

export async function POST(req: NextRequest) {
  await connectDb();
  // your logic here...
}
```

---

That’s it!
Your database will auto-connect on first use.
