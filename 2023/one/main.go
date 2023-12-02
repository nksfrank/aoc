package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"sync"
	"unicode"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func parse(line string, wg *sync.WaitGroup, ch chan int) {
	defer wg.Done()
	var first, last = make(chan rune), make(chan rune)
	go func(line string, ch chan rune) {
		for _, c := range line {
			if unicode.IsDigit(c) {
				ch <- c
				close(ch)
				break;
			}
		}
	}(line, first)
	go func(line string, ch chan rune) {
		r := []rune(line)
		for i := len(r) - 1; i >= 0; i-- {
			c := r[i]
			if unicode.IsDigit(c) {
				ch <- c
				close(ch)
				break;
			}
		}
	}(line, last)
	
	r := string(<-first) + string(<-last)
	i, err := strconv.Atoi(r)
	check(err)
	ch <- i
}

func main() {
	f, err := os.Open("input.txt")
	check(err)
	defer f.Close()

	scanner := bufio.NewScanner(f)
	scanner.Split(bufio.ScanLines)

	ch := make(chan int, 1)
	wg := sync.WaitGroup{}
	for scanner.Scan() {
		wg.Add(1)
		line := scanner.Text()
		go parse(line, &wg, ch)
	}
	go func() {
		wg.Wait()
		close(ch)
	}()

	sum := 0
	for i := range ch {
		sum += i
	}
	fmt.Println(sum)
}