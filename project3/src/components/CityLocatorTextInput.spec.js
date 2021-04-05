import React from "react"
import { shallow } from "enzyme"
import CityLocatorTextInput from "../CityLocatorTextInput"

describe("CityLocatorTextInput", () => {
  let container

  beforeEach(() => {
    container = shallow(
      <CityLocatorTextInput
      />
    )
  })
  it("should render a <div />", () => {
    expect(container.find("div").length).toBeGreaterThanOrEqual(1)
  })
})