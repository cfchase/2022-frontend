# Microcontroller LEDs

## LEDS available

There are 4 LEDS in a row across the top of the board.
- Red
- Green
- Blue
- Yellow

There is one [NeoPixel LED](https://learn.adafruit.com/adafruit-neopixel-uberguide/individual-neopixels) capable of producing any color.

## LED sequencing

### Microcontroller boot
Turn all of the LEDs on and then off once the boot process has completed.
| Red | Green | Blue | Yellow |
|---|---|---|---|
| Red (**on**) | Green (**on**) | Blue (**on**) | Yellow (**on**) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |

### Microcontroller pairing
Cycle through each colored LED, one at a time while the pairing process is happening.
| Red | Green | Blue | Yellow |
|---|---|---|---|
| Red (**on**) | Green (off) | Blue (off) | Yellow (off) |
| Red (off) | Green (**on**) | Blue (off) | Yellow (off) |
| Red (off) | Green (off) | Blue (**on**) | Yellow (off) |
| Red (off) | Green (off) | Blue (off) | Yellow (**on**) |
| Red (**on**) | Green (off) | Blue (off) | Yellow (off) |

### Microcontroller paired
Blink all of the LEDs three times to indicate a successful pairing. Maybe 250 milliseconds for each blink.

| Red | Green | Blue | Yellow |
|---|---|---|---|
| Red (**on**) | Green (**on**) | Blue (**on**) | Yellow (**on**) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |
| Red (**on**) | Green (**on**) | Blue (**on**) | Yellow (**on**) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |
| Red (**on**) | Green (**on**) | Blue (**on**) | Yellow (**on**) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |

### Microcontroller unsuccessful pairing
Blink just the red LED three times. Maybe 250 milliseconds for each blink.
| Red | Green | Blue | Yellow |
|---|---|---|---|
| Red (**on**) | Green (off) | Blue (off) | Yellow (off) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |
| Red (**on**) | Green (off) | Blue (off) | Yellow (off) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |
| Red (**on**) | Green (off) | Blue (off) | Yellow (off) |
| Red (off) | Green (off) | Blue (off) | Yellow (off) |
