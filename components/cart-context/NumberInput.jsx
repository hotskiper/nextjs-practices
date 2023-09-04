import { Button, Input } from '@mui/material'

const NumberInput = ({ num, setFn }) => {
  function increaseFn() {
    setFn(num + 1)
  }

  function decreaseFn() {
    if (num >= 1) {
      setFn(num - 1)
    }
  }

  return (
    <div className="flex">
      <Button
        className=" min-w-[16px]"
        onClick={() => {
          decreaseFn()
        }}
        disabled={num <= 0}
      >
        -
      </Button>
      <Input value={num} className="" />
      <Button
        className=" min-w-[16px]"
        onClick={() => {
          increaseFn()
        }}
      >
        +
      </Button>
    </div>
  )
}

export default NumberInput
