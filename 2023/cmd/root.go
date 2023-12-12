package cmd

import (
	"fmt"
	"os"

	"github.com/nksfrank/aoc/cmd/day1"
	"github.com/nksfrank/aoc/cmd/day2"
	"github.com/nksfrank/aoc/cmd/day3"
	"github.com/nksfrank/aoc/cmd/day4"
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
		day1.Cmd,
		day2.Cmd,
		day3.Cmd,
		day4.Cmd,
	)
	rootCmd.AddCommand(dayCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}