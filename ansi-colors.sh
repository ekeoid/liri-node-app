#!/bin/bash
# https://en.wikipedia.org/wiki/ANSI_escape_code
# Generates an 8 bit color table (256 colors) for
# reference purposes, using the \033[48;5;${val}m
# ANSI CSI+SGR (see "ANSI Code" on Wikipedia)
#
# Usage Foreground: \033[38;5;{#0..256#}
# Usage Background: \033[48;5;{#0..256#}
# Default Color: \033[m
printf "\n   +  "
for i in {0..35}; do
  printf "%2b " $i
done

printf "\n\n %3b  " 0
for i in {0..15}; do
  printf "\033[48;5;${i}m  \033[m "
done

#for i in 16 52 88 124 160 196 232; do
for i in {0..6}; do
  let "i = i*36 +16"
  printf "\n\n %3b  " $i
  for j in {0..35}; do
    let "val = i+j"
    printf "\033[48;5;${val}m  \033[m "
  done
done

printf "\n\r\n"