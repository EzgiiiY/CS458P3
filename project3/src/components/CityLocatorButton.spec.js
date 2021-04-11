import React from "react"
import { shallow } from "enzyme"
import CityLocatorButton from "../CityLocatorButton"

describe("CityLocatorButton", () => {
  let container

  beforeEach(() => {
    container = shallow(
      <CityLocatorButton
        buttonAction={jest.fn()}
        buttonValue={""}
      />
    )
  })
  xit("should render a <Button />", () => {
    expect(container.find("Button").length).toBeGreaterThanOrEqual(1)
  })
})