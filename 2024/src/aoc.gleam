import argv
import gleam/dict
import gleam/int
import gleam/io
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string

pub type Memo =
  dict.Dict(#(Int, Int), Int)

pub fn rule(stone: Int) -> List(Int) {
  case stone {
    0 -> [1]
    stone -> {
      let assert Ok(digits) = int.digits(stone, 10)
      case list.length(digits) % 2 {
        0 ->
          digits
          |> list.sized_chunk(list.length(digits) / 2)
          |> list.map(fn(digits) {
            digits |> int.undigits(10) |> result.unwrap(2024 * stone)
          })
        _ -> [stone * 2024]
      }
    }
  }
}

pub fn main() {
  case argv.load().arguments {
    [input] -> {
      let blinks = 75
      let cache =
        input
        |> string.split(" ")
        |> list.map(int.parse)
        |> result.all
        |> result.unwrap([])
        |> list.fold(dict.new(), fn(cache, num) {
          dict.upsert(cache, num, fn(x) {
            case x {
              Some(i) -> i + 1
              None -> 1
            }
          })
        })

      list.range(0, blinks - 1)
      |> list.fold(cache, fn(cache, _) {
        dict.fold(cache, dict.new(), fn(new_cache, num, count) {
          rule(num)
          |> list.fold(new_cache, fn(new_cache, i) {
            dict.upsert(new_cache, i, fn(x) {
              case x {
                Some(i) -> i + count
                None -> count
              }
            })
          })
        })
      })
      |> dict.fold(0, fn(sum, _, num) { sum + num })
      |> int.to_string
      |> io.println
    }
    _ -> {
      io.println("Usage: aoc input \"<input>\"")
    }
  }
}
