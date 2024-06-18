# Speech Extension For Quarto

Adds speech recognition to RevealJS for Quarto. This project ports the [mschmo/reveal-speech](https://github.com/mschmo/reveal-speech) plugin over to Quarto for RevealJS. Credit goes to him for the original plugin. It allows you to verbally control your RevealJS slides.

## Installing


```bash
quarto add parmsam/speech
```

This will install the extension under the `_extensions` subdirectory.
If you're using version control, you will want to check in this directory.

## Using

Simply add the extension to the list of revealjs plugins like:

```yaml
title: My Presentation
format:
    revealjs: default
revealjs-plugins:
  - speech
```

Ensure that you are using a browser like Chrome or Safari [where speech recognition interfaces are supported](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility). Then you'll need to ensure your microphone is enabled and you have given the browser permission to use it for the presentation.

The default phrases you can say to control slide navigation are as follows:

- "Next slide" - Next slide
- "Previous slide" - Previous slide
- "Last slide" - Moves to the last slide of the presentation
- "First slide" - First slide of the presentation
- "Go to slide number" - Prompts you to say a slide number to jump to (e.g. "Go to slide number 3"). Slide numbers are 1-based indexed.

You can change these settings via special option in your YAML header like this:

```yaml
title: My Presentation
format:
    revealjs:
    speech:
        nextKeyword: "gotonext"
        prevKeyword: "gotoprevious"
        lastKeyword: "gotolast"
        firstKeyword: "gotofirst"
        numberKeyword: "gotoslidenumber"
revealjs-plugins:
    - speech
```
Just ensure that each keyword is unique and one word with no spaces.

You can define custom phrases to say to move to the next slide by applying a data-speech-next attribute to a `<section>` slide. Saying that attributes value will move to the next slide:

```html
<section data-speech-next="movingalong">
</section>
```

You can also use reveal fragments by attaching a data-speech attribute to the fragment element. Saying that attribute value will unhide the fragment if it is the next fragment to be shown.

```html
<section>
  <h2>List of Delicious Things:</h2>
  <ol>
    <li class="fragment" data-speech="spaghetti">Spaghetti</li>
    <li class="fragment" data-speech="chicken">Chicken</li>
    <li class="fragment" data-speech="beer">Beer</li>
  </ol>
</section>
```

## Example

Here is the source code for a minimal example: [example.qmd](example.qmd).
