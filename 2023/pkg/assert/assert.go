package assert

import (
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
)

func stringify(arg any) string {
	if arg == nil {
		return "nil"
	}

	switch t := arg.(type) {
	case string:
		return t
	case []byte:
		return string(t)
	case int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64:
		return fmt.Sprintf("%d", t)
	default:
		d, err := json.Marshal(arg)
		if err != nil {
			return string(d)
		}
	}
	return fmt.Sprintf("%s", arg)
}

func runAssert(msg string, args ...any) {
	fmt.Printf("%s: ", msg)

	for _, arg := range args {
		fmt.Printf("%v ", stringify(arg))
	}

	log.Fatal("runtime assert failure")
}

func Ok(err error, msg string, args ...any) {
	if err != nil {
		slog.Error("Assert(Ok)", "error", err)
		runAssert(msg, args...)
	}
}

func NotNil(item any, msg string, args ...any) {
	if item == nil {
		slog.Error("Assert(NotNil): nil encountered")
		runAssert(msg, args...)
	}
}

func Never(msg string, args ...any) {
	Assert(true, msg, args...)
}
func Assert(truthy bool, msg string, args ...any) {
	if !truthy {
		runAssert(msg, args...)
	}
}
