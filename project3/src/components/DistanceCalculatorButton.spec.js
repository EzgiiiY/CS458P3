import React from "react"
import { shallow } from "enzyme"
import DistanceCalculatorButton from "../DistanceCalculatorButton"

describe("DistanceCalculatorButton", () => {
  let container

  beforeEach(() => {
    container = shallow(
      <DistanceCalculatorButton
        buttonAction={jest.fn()}
        buttonValue={""}
        buttonId={""}
      />
    )
  })
  it("should render a <Button />", () => {
    expect(container.find("Button").length).toBeGreaterThanOrEqual(1)
  })
})