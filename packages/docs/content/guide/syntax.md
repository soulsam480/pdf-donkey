# Syntax and Formatting
PDF donkey uses `Liquid` as it's templating language. It's pretty easy to use and learn. This section will explain a little about the language, how-to's and more.

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

 
