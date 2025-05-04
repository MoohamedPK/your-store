import { Input } from "./ui/input"

const Search = () => {
  return (
    <form>
      <label htmlFor="search"></label>
      <Input type="text" name="search" id="search"  className="border-px border-black"/>
    </form>
  )
}

export default Search
