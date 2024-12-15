import aoc
import gleeunit
import gleeunit/should

pub fn main() {
  gleeunit.main()
}

pub fn rule_test() {
  aoc.rule(0) |> should.equal([1])
  aoc.rule(125) |> should.equal([253_000])
  aoc.rule(253_000) |> should.equal([253, 0])
}
// pub fn blink_test() {
//   aoc.blink([125, 17]) |> should.equal([253_000, 1, 7])
//   aoc.blink([253_000, 1, 7]) |> should.equal([253, 0, 2024, 14_168])
//   aoc.blink([253, 0, 2024, 14_168])
//   |> should.equal([512_072, 1, 20, 24, 28_676_032])
// }
