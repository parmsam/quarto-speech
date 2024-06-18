# Speech Extension For Quarto

Adds speech recognition to RevealJS for Quarto.

## Installing


```bash
quarto add parmsam/speech
```

This will install the extension under the `_extensions` subdirectory.
If you're using version control, you will want to check in this directory.

## Using

This project ports the [mschmo/reveal-speech](https://github.com/mschmo/reveal-speech) plugin over to Quarto for RevealJS. Credit goes to him for the original plugin.

All you have to do is ensure that you are using a browser like Chrome or Safari [where speech recognition interfaces are supported](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility). Also you will need to ensure you microphone is enabled and you have given the browser permission to use it for the presentation.

The default phrases you can say to control slide navigation are as follows:

- "Next slide" - Next slide
- "Previous slide" - Previous slide
- "Last slide" - Moves to the last slide of the presentation
- "First slide" - First slide of the presentation

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
revealjs-plugins:
    - speech
```
## Example

Here is the source code for a minimal example: [example.qmd](example.qmd).
