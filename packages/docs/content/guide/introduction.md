---
title: Guide
description: PDF Donkey introduction.
---

# Introduction
The generation of PDF is a necessity for all businesses, to send contracts, reports, invoices etc. to multiple clients. Writing this everytime for each client is quite a hectic job.
Thats why we need an automation to make our work easier.

**PDF Donkey** provides such a service in which you can make PDFs within minutes.

## Getting Started

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

## Dynamic Data Templating

Here comes the main feature which makes this app really helpful, you can insert dynamic data into your template using `Liquid` syntax.

::: warning Note
Dynamic data templating can be done in both `rich text mode` and `code mode`.
:::

#### Rich text mode
![alt text](/rich-templating.png 'rich templating')


#### Code mode
![alt text](/code-templating.png 'code templating')

Before inserting, you have to declare those data for the payload in a JSON format. You can do this by clicking on settings and provide the data.

```json
{ "name": "User", "about": "I am  a user", "age": "23" }
```

### Documentation for liquid syntax
For more information regarding liquid syntax, you can refer their official documentation at

[https://shopify.github.io/liquid/.](https://shopify.github.io/liquid/.)

## Conditions for data

You can control the flow of the data by putting different conditionsfor them.

### if
The data gets executed only when some conditions are fulfilled.

```liquid
{% if user.name === "John Doe" %}
    I am a swimmer.
{% endif %}
```

### unless
This logic is opposite of `if`, the data gets executed only when some conditions are not fulfilled.

```liquid
{% unless user.name === "John Doe" %}
    I can't cook.
{% endunless %}
```

### elsif/else
This adds more conditions within an `if` or `unless` block.

```liquid
{% if user.name === "John Doe" %}
    I am a swimmer.
{% elsif user.name === "Kevin Stone" %}
    I am a writer.
{% else %}
    I am a cook.    
{% endif %}
```

### case/when
This creates a switch statement in which the data gets executed only when the case matches with the variable.
`case` initializes the switch statement, and `when` statements define the various conditions.
`else` is used if all the above conditions are not fulfilled.

```liquid
{% assign color = "green" %}
  {% case color %}
    {% when "red", "orange" %}
        This is dangerous.
    {% when "green" %}
        This is safe.
    {% else %}
        This is beautiful.
  {% endcase %}
```

## Iterations of data

This is helpful when there is a collection of data to be executed which you can loop through to print them.

```json
{
    "colors":[
        "red",
        "yellow",
        "blue",
        "green",
        "black"
    ]
}
```

Suppose there is an array of colors you wanted to print,

### for

You can loop through `colors` by using `for` loop in this way.

```html
<ul>
  {% for color in colors %}
  <li>{{color}}</li>
  {% endfor %}
</ul>
```

**HTML output :**

```html
<ul>
  <li>red</li>
  <li>yellow</li>
  <li>blue</li>
  <li>green</li>
  <li>black</li>
</ul>
```

### tablerow

You can generate HTML table by looping through the collection of data using `tablerow`. It must be wrapped between `<table>` and `</table>`.

```html
<table>
  {% tablerow color in colors %}
    {{color}}
  {% endtablerow %}
</table>
```

**HTML output:**

```html
<table>
  <tr class="row1">
    <td class="col1">red</td>
    <td class="col2">yellow</td>
    <td class="col3">blue</td>
    <td class="col4">green</td>
    <td class="col5">black</td>
  </tr>
</table>
```
### Advance iterations
There are some keywords like `else`, `break`, `continue`, `limit` etc. which you can use to construct the data through looping according to you.

You can learn more about these keywords with their examples in the [liquid](https://shopify.github.io/liquid/tags/iteration/) documentation.

 
