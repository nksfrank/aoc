package cmd

import (
	"fmt"
	"os"

	one "github.com/nksfrank/aoc/cmd/1"
	two "github.com/nksfrank/aoc/cmd/2"
	three "github.com/nksfrank/aoc/cmd/3"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "aoc",
	Short: "Advent of code 2023",
	Long:  "Advent of code 2023",
	Run: func(cmd *cobra.Command, args []string) {
	},
}

var dayCmd = &cobra.Command{
	Use:   "day",
	Run: func(cmd *cobra.Command, args []string) {},
}

func init() {
	dayCmd.AddCommand(
		one.Cmd,
		two.Cmd,
		three.Cmd,
	)
	rootCmd.AddCommand(dayCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}