package utils

import (
	"bufio"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
)

func PartRun(fns ...func(*bufio.Scanner) int) func(cmd *cobra.Command, args []string) {
	return func(cmd *cobra.Command, args []string) {
		var part int
		cmd.Flags().IntVarP(&part, "part", "b", 1, "Specify the part (1 or 2)")

		path := fmt.Sprintf(`data/input/%s.txt`, cmd.Name())
		file, err := os.Open(path)
		if err != nil {
			fmt.Printf("File error: %v\n", err)
			os.Exit(1)
		}
		defer file.Close()

		for i, f := range fns {
			p := i + 1
			file.Seek(0, 0)
			scanner := bufio.NewScanner(file)
			fmt.Printf("Day %s, Part %d => %d \n", cmd.Name(), p, f(scanner))
		}
	}
}

func PartRunR[T comparable](fns ...func(r io.Reader) T) func(cmd *cobra.Command, args []string) {
	return func(cmd *cobra.Command, args []string) {

		path := fmt.Sprintf(`data/input/%s.txt`, cmd.Name())
		file, err := os.Open(path)
		if err != nil {
			fmt.Printf("File error: %v\n", err)
			os.Exit(1)
		}
		defer file.Close()

		if part > 0 {
			fns = fns[part-1 : part]
			fmt.Println(part)
		}
		for i, f := range fns {
			p := i + 1
			if part > 0 {
				p = part
			}
			fmt.Printf("Day %s, Part %d => %d \n", cmd.Name(), p, f(file))
			file.Seek(0, 0)
		}
	}
}

var part int

func NewDayCmd[T comparable](cmd *cobra.Command, fns ...func(io.Reader) T) *cobra.Command {
	cmd.Flags().IntVarP(&part, "part", "p", 0, "Specify the part (0 for all)")
	cmd.Run = PartRunR(fns...)
	return cmd
}
