# Day 7 Exercise 1: Install and Verify MongoDB

## Objective

In this exercise, you will set up MongoDB for local development and confirm that you can connect to it.

You will use MongoDB as the database for your Spring Boot API.

---

## Required Tools

You need:

1. MongoDB Community Server
2. MongoDB Compass
3. MongoDB Shell (`mongosh`)

---

## Task 1: Start MongoDB

Start MongoDB on your computer.

Your trainer will guide you based on your operating system.

If MongoDB is running correctly, it should accept connections on:

```text
mongodb://localhost:27017
```

---

## Task 2: Verify Using MongoDB Compass

Open MongoDB Compass and connect to:

```text
mongodb://localhost:27017
```

After connecting, create a database named:

```text
support_desk_db
```

Create a collection named:

```text
tickets
```

---

## Task 3: Insert a Test Document

Insert one test ticket document into the `tickets` collection.

Your document should contain fields such as:

```text
title
description
category
priority
status
createdBy
createdAt
```

You may choose your own values.

---

## Task 4: Verify Using mongosh

Open `mongosh` and run:

```javascript
db.runCommand({ ping: 1 })
```

The result should include:

```text
ok: 1
```

Then switch to your database:

```javascript
use support_desk_db
```

View your tickets:

```javascript
db.tickets.find().pretty()
```

---

## Submission

Submit a short note or screenshot showing:

1. MongoDB Compass connected successfully.
2. The `support_desk_db` database exists.
3. The `tickets` collection exists.
4. At least one test ticket document exists.

---

## Reminder

This exercise is only about confirming MongoDB works on your machine.

Do not modify your Spring Boot code yet.
