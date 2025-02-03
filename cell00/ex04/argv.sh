#!/bin/bash

count=1

for arg in "$@"; do
	if [ $count -le 3 ]; then
		echo "$arg"
	fi

	((count++))
done

