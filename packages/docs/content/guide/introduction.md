---
title: Guide
description: PDF Donkey introduction.
---

# Introduction
The generation of PDF is a necessity for all businesses, to send contracts, reports, invoices etc. to multiple clients. Writing this everytime for each client is quite a hectic job.
Thats why we need an automation to make our work easier.

**PDF Donkey** provides such a service in which you can make PDFs within minutes.

## Create an account

### Sign Up 
To create an account, go to the [Sign Up Page](https://donkey.sambitsahoo.com/login) , click on Sign Up at the bottom and fill your name, email, username and password. You are then ready to go!

### Sign In
To sign in, go to the [Sign In Page](https://donkey.sambitsahoo.com/login) and fill your credentials. You can also use **Google Authentication** as an alternative.

### Dashboard
After signing in, you will be redirected to the dashboard, you can overview all of your templates and can edit them anytime you want.

![alt text](/dashboard.png "dashboard")


You can click on your name in the top right corner to edit your account and to fetch the API key.

![alt text](/accountedit.png "account edit")

## Create your first PDF

![alt text](/template01.png 'new template')

Click on the **Create** button, then provide the `Title` for the template and below that provide a `basic template` e.g.

```html
<h1>My Template</h1>
```

This is done to prevent spamming of new templates which will create unnecessary data. Then click submit to create the template.

Then you will be redirected to a page where you can customize that template.

### Modes for templates

We provide two modes to make a PDF :

1. Rich text mode
2. Code mode

#### Rich text mode

In this mode you can edit and write using the rich text editor.

![alt text](/richtext.png 'rich text editor')

- In this mode you write anything like in a normal text-area field, further you can edit it and give it styling according to your choice.

- You can also add images, links, media files in this mode directly from the `insert` tab.

#### Code mode

In this mode you can edit and write using the `HTML` and custom `CSS`.

![alt text](/codemode.png 'code editor')

- You have to write the structure in HTML like any other webpages.
- To style the PDF's contents, you can write your own CSS for it. You can use inline `style` and click on the settings button give `class` and `id` as selectors to the elements.

![alt text](/css-editor.png 'css editor')

